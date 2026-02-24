/**
 * Participant role within a room.
 */
export type ParticipantRole = "host" | "viewer";

/**
 * Maps users to rooms and their current role.
 * One user can be in multiple rooms; host is the room owner.
 */
export interface IParticipant {
  roomId: string;
  userId: string;
  role: ParticipantRole;
  joinedAt: Date;
  updatedAt: Date;
}

/**
 * Subcollection name used under each room document for participants.
 * Path: /rooms/{roomId}/participants/{userId}
 */
export const PARTICIPANTS_SUBCOLLECTION = "participants";
