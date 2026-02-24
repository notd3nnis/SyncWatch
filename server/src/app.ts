import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import routes from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";

/**
 * Creates and configures the Express application: security, CORS, logging,
 * API routes, and global error handler.
 */
export function createApp(): express.Application {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
  app.use(express.json());

  app.use("/api", routes);

  app.use(errorHandler);

  return app;
}
