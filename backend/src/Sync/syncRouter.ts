import { Router } from "express";
import { verifyAuthToken } from "../Resources/middleware/verifyAuthToken";
import { validateRequest } from "../Resources/middleware/ValidateRequest";
import {
  getReadinessController,
  getSyncStateController,
  postSyncEventController,
  startSyncController,
  upsertSessionStateController,
} from "./SyncController";
import { postSyncEventSchema, upsertSessionSchema } from "./syncSchema";

const syncRouter = Router();

syncRouter.get("/:partyId/readiness", verifyAuthToken, getReadinessController);
syncRouter.get("/:partyId/state", verifyAuthToken, getSyncStateController);
syncRouter.post(
  "/:partyId/session",
  verifyAuthToken,
  validateRequest(upsertSessionSchema),
  upsertSessionStateController
);
syncRouter.post("/:partyId/start", verifyAuthToken, startSyncController);
syncRouter.post("/:partyId/events", verifyAuthToken, validateRequest(postSyncEventSchema), postSyncEventController);

export default syncRouter;
