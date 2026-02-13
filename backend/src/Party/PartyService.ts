import { firestore } from "../Db/firestore";
import { formatDateLabel, nowIso, randomInviteCode, colorFromSeed } from "../Resources/CommonFunctions";
import { CONFLICT, FORBIDDEN } from "../Resources/Constants/StatusCodes";
import { HttpException } from "../Resources/exceptions/HttpExceptions";
import { assertHostOrThrow, getMembershipOrThrow, getPartyOrThrow } from "./PartyGuards";

type PartyStatusLabel = "Current" | "Ended";

type PartyCard = {
  id: string;
  partyId: string;
  title: string;
  description: string;
  date: string;
  movieImage: string;
  movieTitle: string;
  participants: Array<{ id: string; name: string; color: string }>;
  status: PartyStatusLabel;
  inviteCode: string;
};

async function createUniqueInviteCode(): Promise<string> {
  for (let i = 0; i < 8; i++) {
    const code = randomInviteCode(6);
    const snap = await firestore.doc(`invites/${code}`).get();
    if (!snap.exists) return code;
  }

  throw new HttpException(CONFLICT, "Unable to generate invite code. Please retry.");
}

async function loadParticipantPreview(
  partyId: string,
  limit = 5
): Promise<Array<{ id: string; name: string; color: string }>> {
  const memberSnapshot = await firestore
    .collection(`parties/${partyId}/members`)
    .limit(limit)
    .get();

  const memberIds = memberSnapshot.docs.map((doc) => doc.id);
  if (memberIds.length === 0) return [];

  const userRefs = memberIds.map((memberId) => firestore.doc(`users/${memberId}`));
  const userSnaps = await firestore.getAll(...userRefs);
  const namesByUid = new Map<string, string>();

  for (let i = 0; i < memberIds.length; i++) {
    const uid = memberIds[i];
    const userData = (userSnaps[i]?.data() ?? {}) as Record<string, any>;
    const displayName = String(userData.displayName ?? `User ${uid.slice(0, 4)}`);
    namesByUid.set(uid, displayName);
  }

  return memberIds.map((memberId) => ({
    id: memberId,
    name: namesByUid.get(memberId) ?? `User ${memberId.slice(0, 4)}`,
    color: colorFromSeed(memberId),
  }));
}

function toPartyStatus(status: unknown): PartyStatusLabel {
  return String(status ?? "").toLowerCase() === "ended" ? "Ended" : "Current";
}

function toTimestampMillis(value: unknown): number {
  if (!value) return 0;

  if (typeof value === "string") {
    const ms = Date.parse(value);
    return Number.isNaN(ms) ? 0 : ms;
  }

  if (typeof value === "object" && value !== null && "toDate" in value) {
    return (value as { toDate: () => Date }).toDate().getTime();
  }

  return 0;
}

function parseNetflixTitleIdFromUrl(url: string): string {
  const match = url.match(/\/watch\/(\d+)/i);
  return match?.[1] ?? "";
}

export async function createParty(
  uid: string,
  input: Record<string, unknown>
): Promise<{ partyId: string; inviteCode: string }> {
  const now = nowIso();
  const inviteCode = await createUniqueInviteCode();
  const ref = firestore.collection("parties").doc();

  const userSnap = await firestore.doc(`users/${uid}`).get();
  const user = (userSnap.data() ?? {}) as Record<string, any>;

  const contentRef = (input.contentRef ?? {}) as Record<string, any>;
  const settings = (input.settings ?? {}) as Record<string, any>;
  const netflixUrl = String(contentRef.netflixUrl ?? "");
  const netflixTitleId =
    String(contentRef.netflixTitleId ?? "").trim() || parseNetflixTitleIdFromUrl(netflixUrl);
  const selectedProvider = String(user.selectedProvider ?? "").trim();
  const provider = String(input.provider ?? selectedProvider ?? "netflix");
  const displayTitle = String(contentRef.displayTitle ?? input.title ?? "Untitled party");
  const partyTitle = String(input.title ?? displayTitle ?? "Untitled party");

  await ref.set({
    hostUid: uid,
    title: partyTitle,
    description: String(input.description ?? ""),
    provider,
    status: "lobby",
    contentRef: {
      netflixTitleId,
      netflixUrl,
      displayTitle,
      imageUrl: String(contentRef.imageUrl ?? ""),
    },
    settings: {
      maxMembers: Number(settings.maxMembers ?? 8),
      allowMemberPause: Boolean(settings.allowMemberPause ?? true),
      requireNetflixLinked: Boolean(settings.requireNetflixLinked ?? true),
    },
    sync: {
      leaderUid: uid,
      state: "paused",
      positionMs: 0,
      epoch: 1,
      updatedAt: now,
    },
    inviteCode,
    createdAt: now,
    updatedAt: now,
  });

  await firestore.doc(`parties/${ref.id}/members/${uid}`).set({
    uid,
    role: "host",
    joinedAt: now,
    lastSeenAt: now,
    presence: "online",
    readyState: "ready",
  });

  await firestore.doc(`invites/${inviteCode}`).set({
    partyId: ref.id,
    createdBy: uid,
    uses: 0,
    maxUses: 50,
    revoked: false,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
    createdAt: now,
    updatedAt: now,
  });

  return { partyId: ref.id, inviteCode };
}

export async function listPartiesForUser(uid: string): Promise<{
  currentParties: PartyCard[];
  pastParties: PartyCard[];
  parties: PartyCard[];
}> {
  const [hostPartiesSnap, memberSnapshot] = await Promise.all([
    firestore.collection("parties").where("hostUid", "==", uid).get(),
    firestore.collectionGroup("members").where("uid", "==", uid).get(),
  ]);

  const partyIds = new Set<string>();
  hostPartiesSnap.docs.forEach((doc) => partyIds.add(doc.id));
  memberSnapshot.docs.forEach((doc) => {
    const maybePartyRef = doc.ref.parent.parent;
    if (maybePartyRef) partyIds.add(maybePartyRef.id);
  });

  const partyDocs = await Promise.all(
    Array.from(partyIds).map(async (partyId) => {
      const partySnap = await firestore.doc(`parties/${partyId}`).get();
      if (!partySnap.exists) return null;

      const party = partySnap.data() as Record<string, any>;
      const participants = await loadParticipantPreview(partyId, 5);

      const card: PartyCard = {
        id: partyId,
        partyId,
        title: String(party.title ?? ""),
        description: String(party.description ?? ""),
        date: formatDateLabel(party.createdAt),
        movieImage: String(party.contentRef?.imageUrl ?? ""),
        movieTitle: String(party.contentRef?.displayTitle ?? ""),
        participants,
        status: toPartyStatus(party.status),
        inviteCode: String(party.inviteCode ?? ""),
      };

      return {
        sortKey: toTimestampMillis(party.updatedAt ?? party.createdAt),
        card,
      };
    })
  );

  const parties = partyDocs
    .filter((entry): entry is { sortKey: number; card: PartyCard } => Boolean(entry))
    .sort((a, b) => b.sortKey - a.sortKey)
    .map((entry) => entry.card);

  return {
    currentParties: parties.filter((party) => party.status === "Current"),
    pastParties: parties.filter((party) => party.status === "Ended"),
    parties,
  };
}

export async function getPartyForUser(
  partyId: string,
  uid: string
): Promise<Record<string, unknown>> {
  await getMembershipOrThrow(partyId, uid);
  const party = await getPartyOrThrow(partyId);
  const participants = await loadParticipantPreview(partyId, 25);

  return {
    partyId,
    title: String(party.title ?? ""),
    description: String(party.description ?? ""),
    date: formatDateLabel(party.createdAt),
    status: String(party.status ?? "lobby"),
    inviteCode: String(party.inviteCode ?? ""),
    hostUid: String(party.hostUid ?? ""),
    contentRef: {
      netflixTitleId: String(party.contentRef?.netflixTitleId ?? ""),
      netflixUrl: String(party.contentRef?.netflixUrl ?? ""),
      displayTitle: String(party.contentRef?.displayTitle ?? ""),
      imageUrl: String(party.contentRef?.imageUrl ?? ""),
    },
    sync: party.sync ?? {},
    settings: party.settings ?? {},
    participants,
  };
}

export async function endPartyForHost(partyId: string, uid: string): Promise<void> {
  await assertHostOrThrow(partyId, uid);
  await firestore.doc(`parties/${partyId}`).set(
    {
      status: "ended",
      updatedAt: nowIso(),
    },
    { merge: true }
  );
}

export async function leavePartyForUser(partyId: string, uid: string): Promise<void> {
  const party = await getPartyOrThrow(partyId);
  await getMembershipOrThrow(partyId, uid);

  if (String(party.hostUid ?? "") === uid) {
    throw new HttpException(FORBIDDEN, "Host cannot leave. End the party instead.");
  }

  await firestore.doc(`parties/${partyId}/members/${uid}`).delete();
}
