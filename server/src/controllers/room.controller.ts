import { Response, NextFunction } from "express";
import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import { AuthenticatedRequest } from "../middlewares/requireAuth";
import { createRoom, getRoomById, updateRoom, deleteRoom } from "../services/room.service";
import { validateBody } from "../middlewares/validateBody";

const createRoomSchema = Joi.object({
  name: Joi.string().trim().min(1).max(200).required(),
});

const updateRoomSchema = Joi.object({
  name: Joi.string().trim().min(1).max(200),
  currentVideoUrl: Joi.string().uri().allow(""),
});

/**
 * POST /api/rooms - Create a new room (host).
 */
export async function create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.userId!;
    const { name } = req.body as { name: string };
    const room = await createRoom(name, userId);
    res.status(StatusCodes.CREATED).json(room);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/rooms/:id - Get room by ID.
 */
export async function getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const roomId = req.params.id;
    const room = await getRoomById(roomId);
    if (!room) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "Room not found" });
      return;
    }
    res.status(StatusCodes.OK).json(room);
  } catch (err) {
    next(err);
  }
}

/**
 * PATCH /api/rooms/:id - Update room (host only).
 */
export async function update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const roomId = req.params.id;
    const room = await updateRoom(roomId, req.body as { name?: string; currentVideoUrl?: string });
    if (!room) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "Room not found" });
      return;
    }
    res.status(StatusCodes.OK).json(room);
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/rooms/:id - Delete room (host only).
 */
export async function remove(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const roomId = req.params.id;
    const deleted = await deleteRoom(roomId);
    if (!deleted) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "Room not found" });
      return;
    }
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
}

export const createRoomValidation = validateBody(createRoomSchema);
export const updateRoomValidation = validateBody(updateRoomSchema);
