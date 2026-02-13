import { Request, Response, NextFunction } from "express";
import { CREATED, OK } from "../Resources/Constants/StatusCodes";
import { requestUser } from "../Resources/requestHelpers/requestUser";
import { handleRequestError } from "../Resources/requestHelpers/handleRequestError";
import { getProviderStatus, linkProvider } from "./AuthService";

export async function linkProviderController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = requestUser(req);
    await linkProvider(user.uid, req.body.provider);
    res.status(CREATED).json({ ok: true });
  } catch (error) {
    handleRequestError(next, error);
  }
}

export async function providerStatusController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = requestUser(req);
    const providerStatus = await getProviderStatus(user.uid);
    res.status(OK).json(providerStatus);
  } catch (error) {
    handleRequestError(next, error);
  }
}
