import { Request } from "express";
import { UNAUTHORIZED } from "../Constants/StatusCodes";
import { HttpException } from "../exceptions/HttpExceptions";

export function requestUser(req: Request): { uid: string } {
  const authReq = req as Request & { user?: { uid: string } };

  if (!authReq.user?.uid) {
    throw new HttpException(UNAUTHORIZED, "Request user missing");
  }

  return { uid: authReq.user.uid };
}
