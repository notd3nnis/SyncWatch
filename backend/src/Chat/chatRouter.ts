import { Router } from "express";
import { verifyAuthToken } from "../Resources/middleware/verifyAuthToken";
import { validateRequest } from "../Resources/middleware/ValidateRequest";
import { listMessagesController, postMessageController } from "./ChatController";
import { postMessageSchema } from "./chatSchema";

const chatRouter = Router();

chatRouter.get("/:partyId/messages", verifyAuthToken, listMessagesController);
chatRouter.post("/:partyId/messages", verifyAuthToken, validateRequest(postMessageSchema), postMessageController);

export default chatRouter;
