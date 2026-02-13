import { NextFunction, Request, Response } from "express";
import { UNAUTHORIZED } from "../Constants/StatusCodes";
import { resolveRequestUid } from "../requestHelpers/authIdentity";

export async function verifyAuthToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authReq = req as Request & { user?: { uid: string } };
    const uid = await resolveRequestUid({
      authorizationHeader: req.header("Authorization") ?? "",
      devUidHeader: req.header("x-user-id") ?? "",
      nodeEnv: process.env.NODE_ENV,
    });
    authReq.user = { uid };
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(UNAUTHORIZED).json({ message: error.message });
      return;
    }
    res.status(UNAUTHORIZED).json({ message: "Unauthorized" });
  }
}
