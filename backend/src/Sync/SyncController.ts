import { Request, Response, NextFunction } from "express";
import { CREATED, OK } from "../Resources/Constants/StatusCodes";
import { requestUser } from "../Resources/requestHelpers/requestUser";
import { handleRequestError } from "../Resources/requestHelpers/handleRequestError";
import {
  getPartyReadiness,
  getSyncState,
  postSyncEvent,
  startSyncForParty,
  upsertSessionState,
} from "./SyncService";

export async function postSyncEventController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = requestUser(req);
    const sync = await postSyncEvent(req.params.partyId, user.uid, req.body.type, req.body.payload);
    res.status(CREATED).json({ ok: true, sync });
  } catch (error) {
    handleRequestError(next, error);
  }
}

export async function getSyncStateController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = requestUser(req);
    const sync = await getSyncState(req.params.partyId, user.uid);
    res.status(OK).json({ sync });
  } catch (error) {
    handleRequestError(next, error);
  }
}

export async function upsertSessionStateController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = requestUser(req);
    const readiness = await upsertSessionState(req.params.partyId, user.uid, req.body);
    res.status(OK).json({ readiness });
  } catch (error) {
    handleRequestError(next, error);
  }
}

export async function getReadinessController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = requestUser(req);
    const readiness = await getPartyReadiness(req.params.partyId, user.uid);
    res.status(OK).json({ readiness });
  } catch (error) {
    handleRequestError(next, error);
  }
}

export async function startSyncController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = requestUser(req);
    const result = await startSyncForParty(req.params.partyId, user.uid);
    res.status(OK).json(result);
  } catch (error) {
    handleRequestError(next, error);
  }
}
