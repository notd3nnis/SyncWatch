import { Request, Response, NextFunction } from "express";
import { CREATED, OK } from "../Resources/Constants/StatusCodes";
import { requestUser } from "../Resources/requestHelpers/requestUser";
import { handleRequestError } from "../Resources/requestHelpers/handleRequestError";
import { createInvite, joinByInvite } from "./InviteService";

export async function createInviteController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = requestUser(req);
    const inviteCode = await createInvite(req.params.partyId, user.uid);
    res.status(CREATED).json({
      inviteCode,
      deepLink: `syncwatch://party/join?code=${inviteCode}`,
    });
  } catch (error) {
    handleRequestError(next, error);
  }
}

export async function joinByInviteController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = requestUser(req);
    const joined = await joinByInvite(req.body.inviteCode, user.uid);
    res.status(OK).json(joined);
  } catch (error) {
    handleRequestError(next, error);
  }
}
