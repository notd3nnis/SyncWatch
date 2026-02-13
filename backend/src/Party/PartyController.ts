import { Request, Response, NextFunction } from "express";
import { CREATED, OK } from "../Resources/Constants/StatusCodes";
import { requestUser } from "../Resources/requestHelpers/requestUser";
import { handleRequestError } from "../Resources/requestHelpers/handleRequestError";
import {
  createParty,
  endPartyForHost,
  getPartyForUser,
  leavePartyForUser,
  listPartiesForUser,
} from "./PartyService";

export async function createPartyController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = requestUser(req);
    const created = await createParty(user.uid, req.body);
    res.status(CREATED).json(created);
  } catch (error) {
    handleRequestError(next, error);
  }
}

export async function listPartiesController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = requestUser(req);
    const parties = await listPartiesForUser(user.uid);
    res.status(OK).json(parties);
  } catch (error) {
    handleRequestError(next, error);
  }
}

export async function getPartyController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = requestUser(req);
    const party = await getPartyForUser(req.params.partyId, user.uid);
    res.status(OK).json({ party });
  } catch (error) {
    handleRequestError(next, error);
  }
}

export async function endPartyController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = requestUser(req);
    await endPartyForHost(req.params.partyId, user.uid);
    res.status(OK).json({ ok: true });
  } catch (error) {
    handleRequestError(next, error);
  }
}

export async function leavePartyController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = requestUser(req);
    await leavePartyForUser(req.params.partyId, user.uid);
    res.status(OK).json({ ok: true });
  } catch (error) {
    handleRequestError(next, error);
  }
}
