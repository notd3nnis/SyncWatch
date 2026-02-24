import { getFirebaseDatabase } from "../config/firebase";
import { getRoomById } from "./room.service";
import { logger } from "../utils/logger";

/**
 * Playback state stored in Firebase RTDB at /rooms/{roomId}/playback.
 */
export interface PlaybackState {
  state: "playing" | "paused";
  timestamp: number;
  updatedAt: number;
  hostId: string;
}

/**
 * Reads current playback state from Firebase RTDB for a room.
 * @param roomId - Room ID
 * @returns Current playback state or null if not set
 */
export async function getPlaybackState(roomId: string): Promise<PlaybackState | null> {
  try {
    const db = getFirebaseDatabase();
    const ref = db.ref(`rooms/${roomId}/playback`);
    const snapshot = await ref.once("value");
    return snapshot.val();
  } catch (err) {
    logger.warn("getPlaybackState failed", { roomId, error: err });
    return null;
  }
}

/**
 * Updates playback state in Firebase RTDB. Only the host should update.
 * Verifies that room exists and caller is host before writing.
 * @param roomId - Room ID
 * @param hostId - User ID of the host (must match room's hostId)
 * @param state - "playing" | "paused"
 * @param timestamp - Current video time in seconds
 */
export async function setPlaybackState(
  roomId: string,
  hostId: string,
  state: "playing" | "paused",
  timestamp: number
): Promise<boolean> {
  const room = await getRoomById(roomId);
  if (!room || room.hostId !== hostId) return false;
  try {
    const db = getFirebaseDatabase();
    const ref = db.ref(`rooms/${roomId}/playback`);
    await ref.set({
      state,
      timestamp,
      updatedAt: Date.now() / 1000,
      hostId,
    });
    return true;
  } catch (err) {
    logger.error("setPlaybackState failed", { roomId, error: err });
    throw err;
  }
}

/**
 * Verifies that a given timestamp is within an acceptable drift of the stored state.
 * Used to reject obviously stale or spoofed sync requests.
 * @param roomId - Room ID
 * @param timestamp - Claimed playback time
 * @param maxDriftSeconds - Allowed drift in seconds (default 5)
 */
export async function isPlaybackTimestampValid(
  roomId: string,
  timestamp: number,
  maxDriftSeconds: number = 5
): Promise<boolean> {
  const current = await getPlaybackState(roomId);
  if (!current) return true;
  const drift = Math.abs(current.timestamp - timestamp);
  return drift <= maxDriftSeconds;
}
