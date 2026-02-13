import { Router } from "express";
import {
  createPartyController,
  endPartyController,
  getPartyController,
  leavePartyController,
  listPartiesController,
} from "./PartyController";
import { verifyAuthToken } from "../Resources/middleware/verifyAuthToken";
import { validateRequest } from "../Resources/middleware/ValidateRequest";
import { createPartySchema } from "./partySchema";

const partyRouter = Router();

partyRouter.post("/", verifyAuthToken, validateRequest(createPartySchema), createPartyController);
partyRouter.get("/", verifyAuthToken, listPartiesController);
partyRouter.get("/:partyId", verifyAuthToken, getPartyController);
partyRouter.post("/:partyId/end", verifyAuthToken, endPartyController);
partyRouter.post("/:partyId/leave", verifyAuthToken, leavePartyController);

export default partyRouter;
