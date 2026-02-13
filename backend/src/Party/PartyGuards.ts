import { firestore } from "../Db/firestore";
import { FORBIDDEN, NOT_FOUND } from "../Resources/Constants/StatusCodes";
import { HttpException } from "../Resources/exceptions/HttpExceptions";

export async function getPartyOrThrow(partyId: string): Promise<Record<string, any>> {
  const partySnap = await firestore.doc(`parties/${partyId}`).get();
  if (!partySnap.exists) {
    throw new HttpException(NOT_FOUND, "Party not found.");
  }

  return partySnap.data() as Record<string, any>;
}

export async function getMembershipOrThrow(
  partyId: string,
  uid: string
): Promise<Record<string, any>> {
  const memberSnap = await firestore.doc(`parties/${partyId}/members/${uid}`).get();
  if (!memberSnap.exists) {
    throw new HttpException(FORBIDDEN, "You are not a member of this party.");
  }

  return memberSnap.data() as Record<string, any>;
}

export async function assertHostOrThrow(partyId: string, uid: string): Promise<void> {
  const party = await getPartyOrThrow(partyId);
  if (String(party.hostUid ?? "") !== uid) {
    throw new HttpException(FORBIDDEN, "Only the party host can perform this action.");
  }
}
