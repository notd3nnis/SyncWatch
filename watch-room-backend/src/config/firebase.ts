import admin from "firebase-admin";
import { env } from "./env";
import { logger } from "../utils/logger";

let initialized = false;

/**
 * Initializes Firebase Admin SDK (Auth + Firestore + RTDB).
 */
export function initializeFirebase(): void {
  if (initialized) return;
  try {
    if (!env.FIREBASE_PROJECT_ID || !env.FIREBASE_CLIENT_EMAIL || !env.FIREBASE_PRIVATE_KEY) {
      logger.warn("Firebase env not set. Admin SDK will not be initialized");
      return;
    }
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      databaseURL: env.FIREBASE_DATABASE_URL || undefined,
    });
    initialized = true;
    logger.info("Firebase Admin initialized");
  } catch (err) {
    logger.error("Firebase Admin init error", { error: err });
    throw err;
  }
}

/**
 * Returns Firebase Admin Auth instance for verifying Google/Apple tokens.
 * @throws If Firebase has not been initialized
 */
export function getFirebaseAuth(): admin.auth.Auth {
  if (!initialized) {
    throw new Error("Firebase Admin not initialized");
  }
  return admin.auth();
}

/**
 * Returns Firebase Realtime Database reference for ultra-fast playback state.
 * @throws If Firebase has not been initialized
 */
export function getFirebaseDatabase(): admin.database.Database {
  if (!initialized) {
    throw new Error("Firebase Admin not initialized");
  }
  return admin.database();
}

/**
 * Returns Firestore instance for persistent data (users, rooms, chat history).
 * @throws If Firebase has not been initialized
 */
export function getFirestore(): admin.firestore.Firestore {
  if (!initialized) {
    throw new Error("Firebase Admin not initialized");
  }
  return admin.firestore();
}

/**
 * Returns whether Firebase Admin has been initialized.
 */
export function isFirebaseInitialized(): boolean {
  return initialized;
}
