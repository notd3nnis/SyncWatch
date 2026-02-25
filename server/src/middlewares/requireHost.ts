import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./requireAuth";
import { isHost } from "../services/participant.service";
import { StatusCodes } from "http-status-codes";

/**
 * Ensures the authenticated user is the host of the room in req.params.roomId.
 * Must be used after requireAuth and only on routes that have :roomId.
 */
export function requireHost(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const roomId = req.params.roomId;
  const userId = req.userId;
  if (!roomId || !userId) {
    res.status(StatusCodes.FORBIDDEN).json({ error: "Forbidden" });
    return;
  }
  isHost(roomId, userId)
    .then((ok) => {
      if (!ok) {
        res.status(StatusCodes.FORBIDDEN).json({ error: "Only the room host can perform this action" });
        return;
      }
      next();
    })
    .catch(next);
}
