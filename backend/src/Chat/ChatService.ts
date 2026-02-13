import { firestore } from "../Db/firestore";
import { getMembershipOrThrow } from "../Party/PartyGuards";
import { nowIso } from "../Resources/CommonFunctions";

export async function postMessage(partyId: string, uid: string, text: string): Promise<void> {
  await getMembershipOrThrow(partyId, uid);

  await firestore.collection(`parties/${partyId}/chat`).add({
    senderUid: uid,
    text,
    type: "text",
    sentAt: nowIso(),
  });
}

export async function listMessages(
  partyId: string,
  uid: string,
  limit = 50
): Promise<Array<Record<string, unknown>>> {
  await getMembershipOrThrow(partyId, uid);

  const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 100) : 50;

  const snap = await firestore
    .collection(`parties/${partyId}/chat`)
    .orderBy("sentAt", "desc")
    .limit(safeLimit)
    .get();

  return snap.docs
    .map((doc) => ({
      messageId: doc.id,
      ...doc.data(),
    }))
    .reverse();
}

export async function clearChatForHost(partyId: string, uid: string): Promise<void> {
  const partySnap = await firestore.doc(`parties/${partyId}`).get();
  if (!partySnap.exists || String((partySnap.data() as any).hostUid ?? "") !== uid) {
    return;
  }

  const messages = await firestore.collection(`parties/${partyId}/chat`).limit(200).get();
  if (messages.empty) return;

  const batch = firestore.batch();
  messages.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
}

export async function postSystemMessage(
  partyId: string,
  text: string
): Promise<void> {
  await firestore.collection(`parties/${partyId}/chat`).add({
    senderUid: "system",
    text,
    type: "system",
    sentAt: nowIso(),
  });
}
