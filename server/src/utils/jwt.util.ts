import jwt from "jsonwebtoken";
import { env } from "../config/env";

/**
 * Payload embedded in the session JWT returned after Google/Apple auth.
 */
export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

/**
 * Generates a session JWT for the authenticated user.
 * @param userId - User ID (e.g. Firestore users doc id: provider:providerId)
 * @param email - User email
 * @returns Signed JWT string
 */
export function signToken(userId: string, email: string): string {
  return jwt.sign(
    { userId, email } as JwtPayload,
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] }
  );
}

/**
 * Verifies and decodes a session JWT.
 * @param token - JWT string (e.g. from Authorization header)
 * @returns Decoded payload or null if invalid/expired
 */
export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    return decoded;
  } catch {
    return null;
  }
}
