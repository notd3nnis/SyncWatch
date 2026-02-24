import { createServer } from "http";
import { env, validateEnv } from "./config/env";
import { connectDatabase, disconnectDatabase } from "./config/database";
import { initializeFirebase } from "./config/firebase";
import { createApp } from "./app";
import { createSocketServer } from "./websockets/socket.manager";
import { logger } from "./utils/logger";

/**
 * Entry point: validates env, connects DB and Firebase, mounts Express on HTTP server,
 * attaches Socket.IO, and starts listening on PORT.
 */
async function main(): Promise<void> {
  validateEnv();
  await connectDatabase();
  initializeFirebase();

  const app = createApp();
  const httpServer = createServer(app);
  createSocketServer(httpServer);

  httpServer.listen(env.PORT, () => {
    logger.info(`Server listening on port ${env.PORT}`);
  });
}

main().catch((err) => {
  logger.error("Fatal error", { error: err });
  process.exit(1);
});

process.on("SIGTERM", async () => {
  logger.info("SIGTERM received, shutting down");
  await disconnectDatabase();
  process.exit(0);
});
