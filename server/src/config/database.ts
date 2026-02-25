import { logger } from "../utils/logger";

/**
 * No-op database connector.
 * All persistent data for SyncWatch lives in Firebase (Firestore + RTDB)
 */
export async function connectDatabase(): Promise<void> {
  logger.info("connectDatabase called - using Firebase");
}

/**
 * No-op database disconnector for symmetry with connectDatabase.
 */
export async function disconnectDatabase(): Promise<void> {
  logger.info("disconnectDatabase called");
}
