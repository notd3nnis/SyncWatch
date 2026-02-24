import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import * as roomController from "../controllers/room.controller";
import { requireAuth } from "../middlewares/requireAuth";
import { requireHost } from "../middlewares/requireHost";

const router = Router();

/** Middleware: map :id to :roomId so requireHost can run */
function mapIdToRoomId(req: Request, _res: Response, next: NextFunction): void {
  (req.params as Record<string, string>).roomId = req.params.id;
  next();
}

router.use(requireAuth);

/** POST /api/rooms - Create room */
router.post("/", roomController.createRoomValidation, roomController.create);

/** GET /api/rooms/:id - Get room by ID */
router.get("/:id", roomController.getById);

/** PATCH /api/rooms/:id - Update room (host only) */
router.patch("/:id", mapIdToRoomId, requireHost, roomController.updateRoomValidation, roomController.update);

/** DELETE /api/rooms/:id - Delete room (host only) */
router.delete("/:id", mapIdToRoomId, requireHost, roomController.remove);

export default router;
