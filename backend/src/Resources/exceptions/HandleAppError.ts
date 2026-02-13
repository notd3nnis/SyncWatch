import { NextFunction, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "../Constants/StatusCodes";
import { HttpException } from "./HttpExceptions";

export function handleAppError(
  error: Error,
  _: Request,
  res: Response,
  __: NextFunction
): void {
  if (error instanceof HttpException) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  res.status(INTERNAL_SERVER_ERROR).json({ message: "Unexpected server error" });
}
