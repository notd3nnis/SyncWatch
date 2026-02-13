import { getDatabase } from "firebase-admin/database";
import { firebaseApp } from "./firebaseAdmin";

export const realtimeDb = getDatabase(firebaseApp);
