import { Router } from "express";
import * as participantController from "../controllers/participant.controller";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router({ mergeParams: true });

router.use(requireAuth);

/** POST /api/rooms/:roomId/participants/join - Join room as viewer */
router.post("/join", participantController.join);

/** GET /api/rooms/:roomId/participants - List participants */
router.get("/", participantController.list);

/** DELETE /api/rooms/:roomId/participants/:userId - Kick user or leave (self) */
router.delete("/:userId", participantController.kick);

export default router;