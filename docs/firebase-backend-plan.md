# Firebase Backend Plan for SyncWatch (Teleparty-Style)

This document outlines a practical backend design for synchronized watch parties with chat, deep-link invites, and Netflix account linking constraints.

## 1) Product boundaries and legal constraints

- Netflix does not provide a public playback/content API for third-party watch-party apps.
- SyncWatch should **not** proxy Netflix streams or scrape Netflix credentials.
- The app can orchestrate party state (who is in a room, current timestamp, pause/play state, chat) while playback actually runs in Netflix clients/extensions.
- Account linking should be handled as a verification/ownership signal where possible (e.g., extension checks logged-in state), not by collecting Netflix passwords.

## 2) Firebase services to use

- **Firebase Authentication**
  - Identity for users (email/password, Apple, Google, phone, anonymous guest upgrade).
  - Custom claims for moderation/admin roles.
- **Cloud Firestore**
  - Real-time party state, membership, chat, invites, sync events.
- **Cloud Functions v2**
  - Secure server-side join flow, invite creation/validation, moderation actions, periodic cleanup.
  - Optional HTTP endpoints for deep-link landing logic.
- **Firebase Dynamic Links (or app links/universal links if preferred)**
  - Invite links that open mobile app or web fallback.
- **Cloud Messaging (FCM)**
  - Push notifications for invite accepted, party started, mentions.
- **Firebase App Check**
  - Reduce abuse from non-trusted clients.
- **Cloud Storage**
  - Optional user avatars and party cover images.
- **BigQuery export + Analytics**
  - Session quality metrics and abuse/security monitoring.

## 3) High-level architecture

1. User signs in via Firebase Auth.
2. Host creates a party (`createParty` callable function).
3. Function writes party doc + short invite code + signed deep link payload.
4. Friends open deep link; app resolves code and calls `joinParty` function.
5. Members subscribe to Firestore room documents:
   - party metadata
   - current playback cursor and authority state
   - participant presence
   - chat thread
6. Clients emit playback intents (`play`, `pause`, `seek`) through controlled writes.
7. A leader/coordinator model resolves final state and broadcasts authoritative timeline.
8. Notifications and moderation run from Cloud Functions triggers.

## 3.1) Architecture diagram

```mermaid
flowchart LR
    A[Mobile App / Web Client] -->|Auth| B[Firebase Authentication]
    A -->|Realtime reads/writes| C[Cloud Firestore]
    A -->|Callable/HTTP| D[Cloud Functions]
    A -->|Push token registration| E[Firebase Cloud Messaging]
    A -->|Invite open| F[Dynamic Links / App Links]

    D -->|Privileged writes| C
    D -->|Send notifications| E
    D -->|Invite signing + validation| F

    G[Browser Extension
(Teleparty-like companion)] -->|Playback events + Netflix URL metadata| D
    G -->|Signed login attestation
(no credentials stored)| C

    C -->|Party state, members, chat, sync timeline| A
    H[Cloud Storage] -->|avatars/artwork (optional)| A
    I[BigQuery/Analytics] <-->|telemetry export| C
```

## 4) Data model (Firestore)

```text
users/{uid}
  displayName
  photoURL
  createdAt
  linkedProviders: {
    netflix: {
      linkedAt,
      verificationMethod,   // extension_cookie_check | manual | oauth_if_ever_available
      lastVerifiedAt,
      profileAlias
    }
  }

parties/{partyId}
  hostUid
  title
  provider              // netflix | prime | ...
  contentRef: {
    canonicalTitle,
    year,
    netflixUrl,         // deeplink or browse URL captured by host
    artworkUrl,
    runtimeSec
  }
  status                // scheduled | live | ended
  createdAt
  scheduledStartAt
  inviteCode            // short human-friendly code
  settings: {
    maxMembers,
    chatEnabled,
    lateJoinSync,
    requireProviderLinked
  }
  sync: {
    leaderUid,
    state,              // playing | paused | buffering
    positionMs,
    updatedAt,
    epoch               // monotonic version to avoid stale writes
  }

parties/{partyId}/members/{uid}
  role                  // host | mod | member
  joinedAt
  lastSeenAt
  presence              // online | offline
  deviceLatencyMs
  readyState            // not_ready | ready | buffering

parties/{partyId}/chat/{messageId}
  senderUid
  text
  sentAt
  type                  // text | system | reaction

parties/{partyId}/events/{eventId}
  actorUid
  type                  // PLAY | PAUSE | SEEK | HEARTBEAT
  payload
  clientTs
  serverTs
```

## 5) Real-time sync strategy

Use a **soft-authoritative leader model**:

- Host starts as `leaderUid`.
- Leader issues timeline updates every 2–3 seconds while playing.
- Non-leaders predict local time between updates and reconcile drift.
- If drift > threshold (e.g., 1200 ms), apply correction:
  - minor drift: silent rate correction (if platform allows),
  - major drift: seek to authoritative `positionMs`.
- On leader disconnect, function elects next leader (oldest moderator/member online).

### Event conflict rules

- Only leader and moderators can send `SEEK` by default.
- `PAUSE` by any member may be allowed by party setting.
- Firestore transaction checks `sync.epoch` to prevent stale overwrites.

## 6) Chat implementation

- Chat messages append to `chat` subcollection.
- Use Cloud Function trigger for:
  - bad-word filtering / abuse moderation,
  - rate limiting (e.g., max 5 messages / 10 seconds / user),
  - mention notifications via FCM.
- Keep a rolling window in client (last 100 messages) and paginate older.

## 7) Deep linking flow

Invite format:

- Human code: `AB12CD`
- URL: `https://syncwatch.app/invite/AB12CD?sig=...`

Flow:

1. Host requests invite creation.
2. Cloud Function returns code + signed token (HMAC/JWT with expiry).
3. App shares deep link.
4. Receiver opens link:
   - if app installed: route to join screen,
   - else: store handoff state and direct to install/login.
5. Client calls `joinParty` with token.
6. Function validates signature, expiry, membership limits, and provider requirements.

## 8) Netflix integration workaround (without official API)

Since there is no official API:

- Treat Netflix as a **playback surface**, not backend source of truth.
- Require one of these for content targeting:
  1. Host pastes Netflix title URL manually.
  2. Companion browser extension detects current Netflix URL/title metadata from DOM and sends to Firebase.
- For account linking:
  - Browser extension can detect logged-in session presence in Netflix tab (cookie/session existence, no credential exfiltration).
  - Extension sends signed attestation to backend: `uid X verified logged-in on browser Y at time T`.
  - Mobile app shows “Netflix linked” based on attestation freshness.

### Why extension is important

Accurate Teleparty-like synchronization needs browser-level control and video element signals (`currentTime`, `play`, `pause`, `seeking`, buffering). Native mobile app alone cannot control Netflix playback across devices reliably.

## 9) Security and abuse controls

- Firestore security rules:
  - Users can read/write only parties they are members of.
  - Chat writes require membership + not-muted state.
  - `sync` writes restricted to leader/moderators per party settings.
- Cloud Functions as trust boundary:
  - create/join/end party,
  - role changes,
  - invite issuance and validation.
- App Check enabled for mobile/web.
- Optional device fingerprint + IP heuristics for invite abuse.

## 10) Reliability and scaling

- Use compact state docs; high-frequency events go to `events` with TTL.
- Scheduled cleanup function:
  - archive ended parties,
  - delete expired invites,
  - compact old chat if needed.
- Region selection close to target users to reduce sync latency.
- Add client telemetry: join time, median drift, rebuffer count, chat delivery latency.

## 11) Minimal API surface (Cloud Functions)

Callable/HTTP examples:

- `createParty({title, provider, contentRef, settings})`
- `createInvite({partyId})`
- `joinParty({inviteCodeOrToken})`
- `leaveParty({partyId})`
- `setPartyRole({partyId, targetUid, role})`
- `postSyncEvent({partyId, type, payload, clientTs})`
- `endParty({partyId})`

All functions validate auth, membership, and role-based permissions.

## 12) Suggested implementation phases

1. **Phase 1 (MVP)**
   - Auth, create/join party, chat, basic sync state doc, deep links.
2. **Phase 2**
   - Leader election, drift correction, moderation, push notifications.
3. **Phase 3**
   - Browser extension for Netflix URL detection + login attestation.
4. **Phase 4**
   - Analytics dashboards, anti-abuse heuristics, multi-provider support.

## 13) What to avoid

- Do not ask users for Netflix passwords in SyncWatch.
- Do not store Netflix cookies/tokens in plaintext backend records.
- Do not promise full catalog search from Netflix unless sourced by legal/manual/extension-safe methods.

## 14) Practical next step for this repo

- Add a `backend/` Firebase workspace with:
  - `functions/` (TypeScript Cloud Functions)
  - `firestore.rules`
  - `firestore.indexes.json`
  - `appcheck` and environment setup docs
- Integrate existing app screens (parties, lobby, streaming accounts) with these backend endpoints incrementally.
