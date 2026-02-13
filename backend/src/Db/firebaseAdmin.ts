import "dotenv/config";
import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";

function credentialFromEnv() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKeyRaw) {
    return null;
  }

  return cert({
    projectId,
    clientEmail,
    privateKey: privateKeyRaw.replace(/\\n/g, "\n"),
  });
}

const explicitCredential = credentialFromEnv();
const databaseURL = process.env.FIREBASE_DATABASE_URL;

export const firebaseApp =
  getApps()[0] ??
  initializeApp(
    explicitCredential
      ? { credential: explicitCredential, databaseURL }
      : {
          credential: applicationDefault(),
          projectId: process.env.FIREBASE_PROJECT_ID,
          databaseURL,
        }
  );
