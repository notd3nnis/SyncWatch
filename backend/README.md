# SyncWatch Backend API

## Run

```bash
cd /Users/dennisjunioruzeh/Desktop/Personal/SyncWatch/backend
npm install
npm run build
npm run dev
```

## Firebase Env Mapping (Backend)

Backend uses Firebase Admin SDK (service account), not web `firebaseConfig`.

- From Firebase web config:
  - `projectId` -> `FIREBASE_PROJECT_ID`
  - Realtime DB URL -> `FIREBASE_DATABASE_URL`
- From service account JSON (Firebase Console -> Project settings -> Service accounts):
  - `client_email` -> `FIREBASE_CLIENT_EMAIL`
  - `private_key` -> `FIREBASE_PRIVATE_KEY` (keep escaped newlines as `\\n` in `.env`)
- Not used by backend admin init:
  - `apiKey`, `authDomain`, `storageBucket`, `messagingSenderId`, `appId`, `measurementId`

## Auth in local development

Until Firebase ID token wiring is done in mobile, you can pass:

`x-user-id: <any-uid>`

This works only when `NODE_ENV` is not `production`.

If no auth header is sent in non-production, backend falls back to:

`DEV_DEFAULT_UID` (or `syncwatch-dev-user`).

## Base URL

`/api`

## Firebase Realtime Channels

Teleparty-like live updates are published through Firebase Realtime Database:

- `partySync/{partyId}`
  - authoritative playback timeline (`state`, `positionMs`, `playbackRate`, `epoch`, `seq`)
- `partyReadiness/{partyId}`
  - BYON readiness gate (`sameTitle`, `allReady`, per-member readiness snapshot)
- `partyPresence/{partyId}/{uid}`
  - member current title/session heartbeat from extension or manual client

Firestore remains source-of-truth for persistence; RTDB is the low-latency fanout channel.

## Endpoints

### Auth

- `GET /api/auth/provider/status`
- `POST /api/auth/provider/link`
  - body: `{ "provider": "netflix" | "prime" }`

### Users

- `GET /api/users/me`
- `PATCH /api/users/me`
  - body: `{ "displayName"?: string, "email"?: string, "avatarUrl"?: string }`

### Parties

- `POST /api/parties`
- `GET /api/parties`
- `GET /api/parties/:partyId`
- `POST /api/parties/:partyId/end`
- `POST /api/parties/:partyId/leave`

### Invites

- `POST /api/invites/party/:partyId`
- `POST /api/invites/join`
  - body: `{ "inviteCode": "AB12CD" }`

### Chat

- `GET /api/chat/:partyId/messages?limit=50`
- `POST /api/chat/:partyId/messages`
  - body: `{ "text": "hello" }`

### Sync

- `GET /api/sync/:partyId/readiness`
- `GET /api/sync/:partyId/state`
- `POST /api/sync/:partyId/session`
  - body:
    ```json
    {
      "netflixTitleId": "80101234",
      "netflixUrl": "https://www.netflix.com/watch/80101234",
      "ready": true,
      "source": "extension"
    }
    ```
- `POST /api/sync/:partyId/start`
- `POST /api/sync/:partyId/events`
  - body:
    ```json
    {
      "type": "PLAY | PAUSE | SEEK | HEARTBEAT",
      "payload": { "positionMs": 12000, "playbackRate": 1, "seq": 42 }
    }
    ```

## UI Flow -> Endpoint Map

All requests require either:
- `Authorization: Bearer <firebase-id-token>` (production), or
- `x-user-id: <uid>` (local dev only)

### 1) Onboarding

- Current UI can remain local-only.
- Optional backend prefetch at app boot:
  - `GET /api/auth/provider/status`
  - Use to decide whether to route user to provider selection or straight to home.

### 2) Select Provider

- On user selecting Netflix/Prime and pressing Continue:
  - `POST /api/auth/provider/link`
  - body: `{ "provider": "netflix" }` or `{ "provider": "prime" }`
- Optional immediate refresh:
  - `GET /api/auth/provider/status`

### 3) Home (Create Party modal flow)

- Home is URL-driven (no TMDB picker endpoint).
- User opens Netflix directly and pastes a watch URL:
  - `https://www.netflix.com/watch/{id}`
- User selects title directly on Netflix web (`/watch/{id}`) or pastes Netflix watch URL.
- On "Generate invite" in create-party form:
  - `POST /api/parties`
  - body:
    ```json
    {
      "title": "Three Musketeers!",
      "description": "Our first watch party ever!",
      "provider": "netflix",
      "contentRef": {
        "netflixUrl": "https://www.netflix.com/watch/80101234",
        "netflixTitleId": "80101234",
        "displayTitle": "The Unforgivable"
      },
      "settings": {
        "maxMembers": 8,
        "allowMemberPause": true,
        "requireNetflixLinked": true
      }
    }
    ```
  - response returns `partyId` + `inviteCode`.
- Optional regenerate invite code:
  - `POST /api/invites/party/:partyId`

### 4) Parties

- On Parties screen load:
  - `GET /api/parties`
  - response contains grouped data for:
    - `currentParties` -> Current tab
    - `pastParties` -> Past tab
- On join-by-code modal submit:
  - `POST /api/invites/join`
  - body: `{ "inviteCode": "AB12CD" }`
  - response returns `partyId`.

### 5) Party Lobby

- On lobby screen enter:
  - `GET /api/parties/:partyId` (title, description, inviteCode, participants, movie)
  - `GET /api/chat/:partyId/messages?limit=50` (chat timeline)
  - `GET /api/sync/:partyId/readiness` (BYON readiness + same-title status)
  - `GET /api/sync/:partyId/state` (playback baseline)
- On extension/manual Netflix session update:
  - `POST /api/sync/:partyId/session`
- Before host starts synchronized playback:
  - `POST /api/sync/:partyId/start`
- On sending message:
  - `POST /api/chat/:partyId/messages`
- On playback controls (host/leader/mod):
  - `POST /api/sync/:partyId/events`
- On leave/end:
  - member leaves -> `POST /api/parties/:partyId/leave`
  - host ends -> `POST /api/parties/:partyId/end`

### 6) Watch (Go To Party / live watching)

- Before playback starts:
  - `GET /api/sync/:partyId/readiness`
  - `GET /api/sync/:partyId/state`
- Client/extension reports current Netflix title and ready state:
  - `POST /api/sync/:partyId/session`
- During playback heartbeat + controls:
  - `POST /api/sync/:partyId/events`
  - types: `PLAY`, `PAUSE`, `SEEK`, `HEARTBEAT`
- Realtime subscription strategy:
  - subscribe to `partySync/{partyId}` in Firebase RTDB for low-latency updates.

### 7) Settings

- On settings open (profile card):
  - `GET /api/users/me`
- On edit profile save:
  - `PATCH /api/users/me`
  - body: `{ "displayName": "Snow Olohijere", "email": "snow@gmail.com", "avatarUrl": "" }`
- On streaming accounts open:
  - `GET /api/auth/provider/status`
- On changing active provider:
  - `POST /api/auth/provider/link`

## BYON Model

- Users sign into Netflix directly on `netflix.com` (no credentials collected by SyncWatch).
- SyncWatch backend accepts Netflix session/title attestation from extension/manual client via:
  - `POST /api/sync/:partyId/session`
- Party creator provides direct Netflix `/watch/{id}` URL when creating a party, or extension reports it from active tab.
- Sync can be started only when members are ready on the same `netflixTitleId`:
  - validated by `GET /api/sync/:partyId/readiness`
  - enforced by `POST /api/sync/:partyId/start`

## Teleparty-style Behavior (Firebase Native)

- Persistent party/chat state: Firestore
- Low-latency playback + readiness fanout: Realtime Database
- Extension/member session heartbeats publish into `partyPresence/{partyId}/{uid}`
- Host starts sync only after readiness gate passes (`sameTitle=true` and `allReady=true`)
