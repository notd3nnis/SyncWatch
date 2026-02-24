import { Router } from "express";
import * as chatController from "../controllers/chat.controller";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router({ mergeParams: true });

router.use(requireAuth);

/** GET /api/rooms/:roomId/messages - List messages (query: limit, before) */
router.get("/", chatController.listMessages);

/** POST /api/rooms/:roomId/messages - Send message or reaction */
router.post("/", chatController.sendMessageValidation, chatController.sendMessage);

export default router;
