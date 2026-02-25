import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../utils/logger";

/**
 * Error type with optional HTTP status code (set by services).
 */
interface AppError extends Error {
  statusCode?: number;
}

/**
 * Global error handler. Logs the error and sends a safe message to the client.
 * Never exposes raw errors or stack traces in production.
 */
export function errorHandler(err: AppError, _req: Request, res: Response, _next: NextFunction): void {
  const status = err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
  logger.error("Request error", { message: err.message, stack: err.stack });
  res.status(status).json({
    error: status === StatusCodes.INTERNAL_SERVER_ERROR ? "Internal server error" : err.message,
  });
}
