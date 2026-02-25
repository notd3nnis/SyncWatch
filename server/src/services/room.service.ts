import { logger } from "../utils/logger";
import { getFirestore } from "../config/firebase";
import { ROOMS_COLLECTION, IRoom } from "../models/Room";
import { PARTICIPANTS_SUBCOLLECTION, ParticipantRole } from "../models/Participant";
import admin from "firebase-admin";

/**
 * Creates a new room and adds the creator as host participant.
 * @param name - Room display name
 * @param hostId - User ID of the host
 * @returns Created room document
 */
export async function createRoom(name: string, hostId: string): Promise<{ id: string; name: string; hostId: string }> {
  try {
    const db = getFirestore();
    const rooms = db.collection(ROOMS_COLLECTION);
    const roomRef = rooms.doc();
    const now = admin.firestore.FieldValue.serverTimestamp();
    const room: Omit<IRoom, "createdAt" | "updatedAt"> & { createdAt: unknown; updatedAt: unknown } = {
      name,
      hostId,
      currentVideoUrl: undefined,
      createdAt: now,
      updatedAt: now,
    };

    const batch = db.batch();
    batch.set(roomRef, room, { merge: false });
    const hostParticipantRef = roomRef.collection(PARTICIPANTS_SUBCOLLECTION).doc(hostId);
    const participant = {
      roomId: roomRef.id,
      userId: hostId,
      role: "host" as ParticipantRole,
      joinedAt: now,
      updatedAt: now,
    };
    batch.set(hostParticipantRef, participant, { merge: false });
    await batch.commit();

    return { id: roomRef.id, name, hostId };
  } catch (err) {
    logger.error("createRoom failed", { error: err });
    throw err;
  }
}

/**
 * Fetches a room by ID; returns null if not found.
 */
export async function getRoomById(roomId: string): Promise<{ id: string; name: string; hostId: string; currentVideoUrl?: string } | null> {
  const db = getFirestore();
  const snap = await db.collection(ROOMS_COLLECTION).doc(roomId).get();
  if (!snap.exists) return null;
  const room = snap.data() as Partial<IRoom>;
  return {
    id: snap.id,
    name: room.name ?? "",
    hostId: room.hostId ?? "",
    currentVideoUrl: room.currentVideoUrl,
  };
}

/**
 * Updates room fields (e.g. name, currentVideoUrl). Only host should call this.
 */
export async function updateRoom(
  roomId: string,
  updates: { name?: string; currentVideoUrl?: string }
): Promise<{ id: string; name: string; hostId: string; currentVideoUrl?: string } | null> {
  const db = getFirestore();
  const ref = db.collection(ROOMS_COLLECTION).doc(roomId);
  const snap = await ref.get();
  if (!snap.exists) return null;
  await ref.set(
    {
      ...updates,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  const updated = (await ref.get()).data() as Partial<IRoom>;
  return {
    id: ref.id,
    name: updated.name ?? "",
    hostId: (updated.hostId as string) ?? "",
    currentVideoUrl: updated.currentVideoUrl,
  };
}

/**
 * Deletes a room and all its participants.
 */
export async function deleteRoom(roomId: string): Promise<boolean> {
  try {
    const db = getFirestore();
    const ref = db.collection(ROOMS_COLLECTION).doc(roomId);
    const snap = await ref.get();
    if (!snap.exists) return false;
    await ref.delete();
    return true;
  } catch (err) {
    logger.error("deleteRoom failed", { error: err });
    throw err;
  }
}
