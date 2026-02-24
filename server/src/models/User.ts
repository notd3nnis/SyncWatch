/**
 * User document shape (profile, email, avatar).
 * Used for Google/Apple-authenticated users; id is used as hostId in rooms.
 */
export interface IUser {
  email: string;
  displayName: string;
  avatar?: string;
  provider: "google" | "apple";
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Firestore collection name for users.
 * Documents are keyed by an internal user id (used in JWTs and room hostId).
 */
export const USERS_COLLECTION = "users";
