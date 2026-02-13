import { firestore } from "../Db/firestore";
import { realtimeDb } from "../Db/realtimeDb";
import { nowIso } from "../Resources/CommonFunctions";
import { CONFLICT, FORBIDDEN } from "../Resources/Constants/StatusCodes";
import { HttpException } from "../Resources/exceptions/HttpExceptions";
import { getMembershipOrThrow, getPartyOrThrow } from "../Party/PartyGuards";

type SessionPayload = {
  netflixTitleId?: string;
  netflixUrl?: string;
  ready?: boolean;
  source?: "extension" | "manual";
};

type ReadinessMember = {
  uid: string;
  role: string;
  readyState: string;
  currentNetflixTitleId: string;
  currentNetflixUrl: string;
  matchesExpectedTitle: boolean;
};

type ReadinessState = {
  expectedNetflixTitleId: string;
  totalMembers: number;
  readyCount: number;
  sameTitle: boolean;
  allReady: boolean;
  members: ReadinessMember[];
};

async function publishRealtime(path: string, payload: Record<string, unknown>): Promise<void> {
  try {
    await realtimeDb.ref(path).set(payload);
  } catch {
    // Best-effort realtime publish; Firestore remains source-of-truth.
  }
}

async function publishMemberPresence(
  partyId: string,
  uid: string,
  payload: {
    readyState: string;
    currentNetflixTitleId: string;
    currentNetflixUrl: string;
    source: string;
    lastSeenAt: string;
  }
): Promise<void> {
  await publishRealtime(`partyPresence/${partyId}/${uid}`, {
    readyState: payload.readyState,
    currentNetflixTitleId: payload.currentNetflixTitleId,
    currentNetflixUrl: payload.currentNetflixUrl,
    source: payload.source,
    lastSeenAt: payload.lastSeenAt,
  });
}

async function publishReadinessState(
  partyId: string,
  readiness: ReadinessState
): Promise<void> {
  await publishRealtime(`partyReadiness/${partyId}`, {
    expectedNetflixTitleId: readiness.expectedNetflixTitleId,
    totalMembers: readiness.totalMembers,
    readyCount: readiness.readyCount,
    sameTitle: readiness.sameTitle,
    allReady: readiness.allReady,
    members: readiness.members.map((member) => ({
      uid: member.uid,
      role: member.role,
      readyState: member.readyState,
      currentNetflixTitleId: member.currentNetflixTitleId,
      matchesExpectedTitle: member.matchesExpectedTitle,
    })),
    updatedAt: nowIso(),
  });
}

async function publishSyncState(
  partyId: string,
  actorUid: string,
  type: string,
  sync: Record<string, unknown>,
  payload?: Record<string, unknown>
): Promise<void> {
  await publishRealtime(`partySync/${partyId}`, {
    actorUid,
    type,
    state: String(sync.state ?? "paused"),
    leaderUid: String(sync.leaderUid ?? ""),
    positionMs: Number(sync.positionMs ?? 0),
    playbackRate: Number(sync.playbackRate ?? 1),
    epoch: Number(sync.epoch ?? 0),
    seq: Number(payload?.seq ?? sync.epoch ?? 0),
    updatedAt: String(sync.updatedAt ?? nowIso()),
  });
}

function parseNetflixTitleIdFromUrl(url?: string): string {
  if (!url) return "";
  const match = url.match(/\/watch\/(\d+)/i);
  return match?.[1] ?? "";
}

async function getReadinessSnapshot(
  partyId: string,
  partyData?: Record<string, any>
): Promise<ReadinessState> {
  const party = partyData ?? (await getPartyOrThrow(partyId));
  const membersSnap = await firestore.collection(`parties/${partyId}/members`).get();

  const members = membersSnap.docs.map((doc) => {
    const data = doc.data() as Record<string, any>;
    return {
      uid: doc.id,
      role: String(data.role ?? "member"),
      readyState: String(data.readyState ?? "not_ready"),
      currentNetflixTitleId: String(data.currentNetflixTitleId ?? ""),
      currentNetflixUrl: String(data.currentNetflixUrl ?? ""),
    };
  });

  const hostUid = String(party.hostUid ?? "");
  let expectedNetflixTitleId = String(party.contentRef?.netflixTitleId ?? "");

  if (!expectedNetflixTitleId) {
    const hostMember = members.find((member) => member.uid === hostUid);
    if (hostMember?.currentNetflixTitleId) {
      expectedNetflixTitleId = hostMember.currentNetflixTitleId;
    }
  }

  const enrichedMembers: ReadinessMember[] = members.map((member) => ({
    ...member,
    matchesExpectedTitle:
      !expectedNetflixTitleId || member.currentNetflixTitleId === expectedNetflixTitleId,
  }));

  const sameTitle =
    expectedNetflixTitleId.length > 0 &&
    enrichedMembers.length > 0 &&
    enrichedMembers.every((member) => member.currentNetflixTitleId === expectedNetflixTitleId);

  const readyCount = enrichedMembers.filter((member) => {
    const ready = member.readyState === "ready";
    const hasTitle = member.currentNetflixTitleId.length > 0;
    return ready && hasTitle && member.matchesExpectedTitle;
  }).length;

  const allReady = enrichedMembers.length > 0 && sameTitle && readyCount === enrichedMembers.length;

  return {
    expectedNetflixTitleId,
    totalMembers: enrichedMembers.length,
    readyCount,
    sameTitle,
    allReady,
    members: enrichedMembers,
  };
}

function assertCanControlPlayback(
  party: Record<string, any>,
  member: Record<string, any>,
  uid: string,
  type: string
): void {
  const role = String(member.role ?? "member");
  const hostUid = String(party.hostUid ?? "");
  const leaderUid = String(party.sync?.leaderUid ?? hostUid);
  const allowMemberPause = Boolean(party.settings?.allowMemberPause ?? true);

  const isControlUser = uid === hostUid || uid === leaderUid || role === "mod";
  const canControl =
    type === "HEARTBEAT" || isControlUser || (type === "PAUSE" && allowMemberPause);

  if (!canControl) {
    throw new HttpException(FORBIDDEN, "You are not allowed to control playback.");
  }
}

function assertMemberOnExpectedTitle(
  party: Record<string, any>,
  member: Record<string, any>
): void {
  const expectedTitleId = String(party.contentRef?.netflixTitleId ?? "");
  const currentTitleId = String(member.currentNetflixTitleId ?? "");

  if (expectedTitleId && currentTitleId && expectedTitleId !== currentTitleId) {
    throw new HttpException(
      CONFLICT,
      "Member is not on the same Netflix title as the party."
    );
  }
}

export async function upsertSessionState(
  partyId: string,
  uid: string,
  payload: SessionPayload
): Promise<ReadinessState> {
  const [party, member] = await Promise.all([
    getPartyOrThrow(partyId),
    getMembershipOrThrow(partyId, uid),
  ]);

  const now = nowIso();
  const rawNetflixTitleId = String(payload.netflixTitleId ?? "").trim();
  const netflixUrl = String(payload.netflixUrl ?? "").trim();
  const parsedFromUrl = parseNetflixTitleIdFromUrl(netflixUrl);
  const netflixTitleId = rawNetflixTitleId || parsedFromUrl;
  const wantsReady = payload.ready !== false;
  const nextReadyState = wantsReady && netflixTitleId ? "ready" : "not_ready";

  await firestore.doc(`parties/${partyId}/members/${uid}`).set(
    {
      currentNetflixTitleId: netflixTitleId,
      currentNetflixUrl: netflixUrl,
      readyState: nextReadyState,
      presence: "online",
      source: payload.source ?? "manual",
      lastSeenAt: now,
    },
    { merge: true }
  );

  const hostUid = String(party.hostUid ?? "");
  const hasPartyTitle = String(party.contentRef?.netflixTitleId ?? "").length > 0;
  if (uid === hostUid && !hasPartyTitle && netflixTitleId) {
    await firestore.doc(`parties/${partyId}`).set(
      {
        contentRef: {
          ...party.contentRef,
          netflixTitleId,
          netflixUrl:
            netflixUrl || String(party.contentRef?.netflixUrl ?? ""),
        },
        updatedAt: now,
      },
      { merge: true }
    );
  }

  if (netflixTitleId) {
    await firestore.doc(`users/${uid}`).set(
      {
        providerLinks: {
          netflix: {
            status: "verified",
            lastNetflixTitleId: netflixTitleId,
            source: payload.source ?? "manual",
            updatedAt: now,
          },
        },
        updatedAt: now,
      },
      { merge: true }
    );
  }

  const updatedParty = await getPartyOrThrow(partyId);
  const readiness = await getReadinessSnapshot(partyId, updatedParty);

  await Promise.all([
    publishMemberPresence(partyId, uid, {
      readyState: nextReadyState,
      currentNetflixTitleId: netflixTitleId,
      currentNetflixUrl: netflixUrl,
      source: payload.source ?? "manual",
      lastSeenAt: now,
    }),
    publishReadinessState(partyId, readiness),
  ]);

  return readiness;
}

export async function getPartyReadiness(
  partyId: string,
  uid: string
): Promise<ReadinessState> {
  await getMembershipOrThrow(partyId, uid);
  return getReadinessSnapshot(partyId);
}

export async function startSyncForParty(
  partyId: string,
  uid: string
): Promise<{ ok: true; readiness: ReadinessState; sync: Record<string, unknown> }> {
  const [party, member] = await Promise.all([
    getPartyOrThrow(partyId),
    getMembershipOrThrow(partyId, uid),
  ]);

  const role = String(member.role ?? "member");
  const isHostOrMod = uid === String(party.hostUid ?? "") || role === "mod";
  if (!isHostOrMod) {
    throw new HttpException(FORBIDDEN, "Only host/mod can start sync.");
  }

  const readiness = await getReadinessSnapshot(partyId, party);
  if (!readiness.expectedNetflixTitleId) {
    throw new HttpException(CONFLICT, "No Netflix title selected for this party yet.");
  }

  if (!readiness.allReady) {
    throw new HttpException(
      CONFLICT,
      "All members must be ready on the same Netflix title before sync starts."
    );
  }

  const now = nowIso();
  const nextSync = {
    leaderUid: String(party.sync?.leaderUid ?? party.hostUid ?? uid),
    state: "paused",
    positionMs: Number(party.sync?.positionMs ?? 0),
    playbackRate: Number(party.sync?.playbackRate ?? 1),
    epoch: Number(party.sync?.epoch ?? 0) + 1,
    updatedAt: now,
  };

  await firestore.doc(`parties/${partyId}`).set(
    {
      status: "live",
      sync: nextSync,
      updatedAt: now,
    },
    { merge: true }
  );

  await Promise.all([
    publishSyncState(partyId, uid, "START", nextSync),
    publishReadinessState(partyId, readiness),
  ]);

  return { ok: true, readiness, sync: nextSync };
}

export async function postSyncEvent(
  partyId: string,
  uid: string,
  type: string,
  payload: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const [party, member] = await Promise.all([
    getPartyOrThrow(partyId),
    getMembershipOrThrow(partyId, uid),
  ]);

  assertCanControlPlayback(party, member, uid, type);
  assertMemberOnExpectedTitle(party, member);

  const now = nowIso();
  const syncState =
    type === "PLAY" ? "playing" : type === "PAUSE" ? "paused" : party.sync?.state ?? "playing";
  const nextSync = {
    leaderUid: String(party.sync?.leaderUid ?? party.hostUid ?? uid),
    state: syncState,
    positionMs: Number(payload.positionMs ?? 0),
    playbackRate: Number(payload.playbackRate ?? 1),
    epoch: Number(party.sync?.epoch ?? 0) + 1,
    updatedAt: now,
  };

  await firestore.collection(`parties/${partyId}/events`).add({
    actorUid: uid,
    type,
    payload,
    serverTs: now,
  });

  await firestore.doc(`parties/${partyId}`).set(
    {
      sync: nextSync,
      updatedAt: now,
    },
    { merge: true }
  );

  await publishSyncState(partyId, uid, type, nextSync, payload);

  return nextSync;
}

export async function getSyncState(
  partyId: string,
  uid: string
): Promise<Record<string, unknown>> {
  const [party] = await Promise.all([getPartyOrThrow(partyId), getMembershipOrThrow(partyId, uid)]);
  return (party.sync ?? {}) as Record<string, unknown>;
}
