import { getFirestore } from "firebase-admin/firestore";
import { firebaseApp } from "./firebaseAdmin";

export const firestore = getFirestore(firebaseApp);
