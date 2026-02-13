import { Request, Response, NextFunction } from "express";
import { OK } from "../Resources/Constants/StatusCodes";
import { requestUser } from "../Resources/requestHelpers/requestUser";
import { handleRequestError } from "../Resources/requestHelpers/handleRequestError";
import { getOrCreateUserProfile, updateUserProfile } from "./UserService";

export async function getMeController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = requestUser(req);
    const profile = await getOrCreateUserProfile(user.uid);
    res.status(OK).json({ user: profile });
  } catch (error) {
    handleRequestError(next, error);
  }
}

export async function patchMeController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = requestUser(req);
    const profile = await updateUserProfile(user.uid, req.body);
    res.status(OK).json({ user: profile });
  } catch (error) {
    handleRequestError(next, error);
  }
}
