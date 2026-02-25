import { getFirestore } from "../config/firebase";
import { ROOMS_COLLECTION, IRoom } from "../models/Room";
import { PARTICIPANTS_SUBCOLLECTION, ParticipantRole } from "../models/Participant";
import admin from "firebase-admin";

/**
 * Adds a user as a viewer to a room. Fails if already in room or room does not exist.
 * @param roomId - Room ID
 * @param userId - User ID joining
 * @returns Created participant or null if room missing / already joined
 */
export async function joinRoom(
  roomId: string,
  userId: string
): Promise<{ roomId: string; userId: string; role: ParticipantRole } | null> {
  const db = getFirestore();
  const roomRef = db.collection(ROOMS_COLLECTION).doc(roomId);
  const roomSnap = await roomRef.get();
  if (!roomSnap.exists) return null;

  const participantRef = roomRef.collection(PARTICIPANTS_SUBCOLLECTION).doc(userId);
  const existingSnap = await participantRef.get();
  if (existingSnap.exists) {
    const existing = existingSnap.data() as { role?: ParticipantRole };
    return { roomId, userId, role: existing.role ?? "viewer" };
  }

  const now = admin.firestore.FieldValue.serverTimestamp();
  await participantRef.set(
    {
      roomId,
      userId,
      role: "viewer" as ParticipantRole,
      joinedAt: now,
      updatedAt: now,
    },
    { merge: false }
  );
  return { roomId, userId, role: "viewer" };
}

/**
 * Removes a participant from a room. Host can kick anyone; users can leave themselves.
 * @param roomId - Room ID
 * @param userId - User ID to remove (or self for leave)
 * @param actorId - User ID performing the action (must be host to kick others)
 */
export async function removeParticipant(roomId: string, userId: string, actorId: string): Promise<boolean> {
  const db = getFirestore();
  const roomRef = db.collection(ROOMS_COLLECTION).doc(roomId);
  const roomSnap = await roomRef.get();
  if (!roomSnap.exists) return false;
  const room = roomSnap.data() as IRoom;

  const actorIsHost = room.hostId === actorId;
  const isSelf = userId === actorId;
  if (!actorIsHost && !isSelf) return false;

  // Prevent removing the host without a transfer flow.
  if (room.hostId === userId) return false;

  const participantRef = roomRef.collection(PARTICIPANTS_SUBCOLLECTION).doc(userId);
  const snap = await participantRef.get();
  if (!snap.exists) return false;
  await participantRef.delete();
  return true;
}

/**
 * Lists participants in a room with user details.
 */
export async function listParticipants(roomId: string): Promise<Array<{ userId: string; role: ParticipantRole }>> {
  const db = getFirestore();
  const roomRef = db.collection(ROOMS_COLLECTION).doc(roomId);
  const snaps = await roomRef.collection(PARTICIPANTS_SUBCOLLECTION).get();
  return snaps.docs.map((d) => {
    const data = d.data() as { role?: ParticipantRole };
    return { userId: d.id, role: data.role ?? "viewer" };
  });
}

/**
 * Checks if the given user is the host of the room.
 */
export async function isHost(roomId: string, userId: string): Promise<boolean> {
  const db = getFirestore();
  const snap = await db.collection(ROOMS_COLLECTION).doc(roomId).get();
  if (!snap.exists) return false;
  const room = snap.data() as Partial<IRoom>;
  return room.hostId === userId;
}
