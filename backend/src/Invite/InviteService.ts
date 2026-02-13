import { firestore } from "../Db/firestore";
import { nowIso, randomInviteCode } from "../Resources/CommonFunctions";
import { CONFLICT, NOT_FOUND } from "../Resources/Constants/StatusCodes";
import { HttpException } from "../Resources/exceptions/HttpExceptions";
import { getMembershipOrThrow, getPartyOrThrow } from "../Party/PartyGuards";

async function createUniqueInviteCode(): Promise<string> {
  for (let i = 0; i < 8; i++) {
    const code = randomInviteCode(6);
    const snap = await firestore.doc(`invites/${code}`).get();
    if (!snap.exists) return code;
  }

  throw new HttpException(CONFLICT, "Unable to generate invite code. Please retry.");
}

export async function createInvite(partyId: string, uid: string): Promise<string> {
  await getPartyOrThrow(partyId);
  await getMembershipOrThrow(partyId, uid);

  const inviteCode = await createUniqueInviteCode();
  const now = nowIso();

  await firestore.doc(`invites/${inviteCode}`).set({
    partyId,
    createdBy: uid,
    uses: 0,
    maxUses: 50,
    revoked: false,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
    createdAt: now,
    updatedAt: now,
  });

  await firestore.doc(`parties/${partyId}`).set(
    {
      inviteCode,
      updatedAt: now,
    },
    { merge: true }
  );

  return inviteCode;
}

export async function joinByInvite(
  inviteCodeInput: string,
  uid: string
): Promise<{ partyId: string; joined: boolean }> {
  const inviteCode = inviteCodeInput.trim().toUpperCase();
  const inviteRef = firestore.doc(`invites/${inviteCode}`);
  const now = nowIso();

  let partyId = "";
  let joined = false;

  await firestore.runTransaction(async (tx) => {
    const inviteSnap = await tx.get(inviteRef);
    if (!inviteSnap.exists) {
      throw new HttpException(NOT_FOUND, "Invite not found.");
    }

    const invite = inviteSnap.data() as Record<string, any>;
    if (Boolean(invite.revoked)) {
      throw new HttpException(CONFLICT, "Invite has been revoked.");
    }

    const expiresAt = String(invite.expiresAt ?? "");
    const expiresAtMs = Date.parse(expiresAt);
    if (expiresAt && !Number.isNaN(expiresAtMs) && expiresAtMs < Date.now()) {
      throw new HttpException(CONFLICT, "Invite has expired.");
    }

    const uses = Number(invite.uses ?? 0);
    const maxUses = Number(invite.maxUses ?? 0);
    if (maxUses > 0 && uses >= maxUses) {
      throw new HttpException(CONFLICT, "Invite usage limit reached.");
    }

    partyId = String(invite.partyId ?? "");
    if (!partyId) {
      throw new HttpException(NOT_FOUND, "Invite does not map to a party.");
    }

    const partyRef = firestore.doc(`parties/${partyId}`);
    const memberRef = firestore.doc(`parties/${partyId}/members/${uid}`);

    const [partySnap, memberSnap] = await Promise.all([tx.get(partyRef), tx.get(memberRef)]);

    if (!partySnap.exists) {
      throw new HttpException(NOT_FOUND, "Party not found.");
    }

    const party = partySnap.data() as Record<string, any>;
    if (String(party.status ?? "").toLowerCase() === "ended") {
      throw new HttpException(CONFLICT, "Party has already ended.");
    }

    if (!memberSnap.exists) {
      joined = true;
      tx.set(memberRef, {
        uid,
        role: "member",
        joinedAt: now,
        lastSeenAt: now,
        presence: "online",
        readyState: "not_ready",
      });

      tx.update(inviteRef, {
        uses: uses + 1,
        updatedAt: now,
      });
    }
  });

  return { partyId, joined };
}
