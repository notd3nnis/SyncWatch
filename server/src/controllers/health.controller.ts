import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { isFirebaseInitialized, getFirestore } from "../config/firebase";

/**
 * GET /api/health - Liveness/readiness probe.
 * Returns 200 with { status, firebaseInitialized, firestore }.
 */
export async function health(_req: Request, res: Response): Promise<void> {
  const firebaseInitialized = isFirebaseInitialized();
  let firestore: "ok" | "unavailable" = firebaseInitialized ? "ok" : "unavailable";
  if (firebaseInitialized) {
    try {
      // Lightweight check - fetch a non-existent doc.
      await getFirestore().collection("_health").doc("ping").get();
      firestore = "ok";
    } catch {
      firestore = "unavailable";
    }
  }
  res.status(StatusCodes.OK).json({ status: "ok", firebaseInitialized, firestore });
}
