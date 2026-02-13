import { NextFunction } from "express";

export function handleRequestError(next: NextFunction, error: unknown): void {
  if (error instanceof Error) {
    next(error);
    return;
  }
  next(new Error("Unknown request error"));
}
