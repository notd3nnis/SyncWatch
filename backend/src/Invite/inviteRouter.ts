import { Router } from "express";
import { verifyAuthToken } from "../Resources/middleware/verifyAuthToken";
import { validateRequest } from "../Resources/middleware/ValidateRequest";
import { createInviteController, joinByInviteController } from "./InviteController";
import { joinInviteSchema } from "./inviteSchema";

const inviteRouter = Router();

inviteRouter.post("/join", verifyAuthToken, validateRequest(joinInviteSchema), joinByInviteController);
inviteRouter.post("/party/:partyId", verifyAuthToken, createInviteController);

export default inviteRouter;
