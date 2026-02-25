import { Router } from "express";
import * as syncController from "../controllers/sync.controller";
import { requireAuth } from "../middlewares/requireAuth";
import { requireHost } from "../middlewares/requireHost";

const router = Router({ mergeParams: true });

router.use(requireAuth);

/** GET /api/rooms/:roomId/sync - Get playback state */
router.get("/", syncController.getSync);

/** PUT /api/rooms/:roomId/sync - Update playback state (host only) */
router.put("/", requireHost, syncController.syncBodyValidation, syncController.updateSync);

export default router;
