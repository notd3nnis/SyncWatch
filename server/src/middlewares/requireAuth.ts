import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";
import { StatusCodes } from "http-status-codes";

/**
 * Extended Express Request with authenticated user id (set by requireAuth).
 */
export interface AuthenticatedRequest extends Request {
  userId?: string;
}

/**
 * Validates JWT from Authorization: Bearer <token> and attaches userId to req.
 * Responds with 401 if missing or invalid.
 */
export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: "Missing or invalid authorization" });
    return;
  }
  const payload = verifyToken(token);
  if (!payload) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid or expired token" });
    return;
  }
  req.userId = payload.userId;
  next();
}
