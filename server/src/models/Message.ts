/**
 * Chat message or reaction in a room.
 */
export interface IMessage {
  roomId: string;
  userId: string;
  type: "text" | "reaction";
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Subcollection name used under each room document for chat messages.
 * Path: /rooms/{roomId}/messages/{messageId}
 */
export const MESSAGES_SUBCOLLECTION = "messages";
