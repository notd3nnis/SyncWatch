import { getAuth } from "firebase-admin/auth";
import { UNAUTHORIZED } from "../Constants/StatusCodes";
import { HttpException } from "../exceptions/HttpExceptions";

type IdentityInput = {
  authorizationHeader?: string;
  devUidHeader?: string;
  nodeEnv?: string;
};

export async function resolveRequestUid(input: IdentityInput): Promise<string> {
  const nodeEnv = input.nodeEnv ?? process.env.NODE_ENV;
  const devUid = String(input.devUidHeader ?? "").trim();

  if (nodeEnv !== "production" && devUid) {
    return devUid;
  }

  if (nodeEnv !== "production") {
    return process.env.DEV_DEFAULT_UID?.trim() || "syncwatch-dev-user";
  }

  const authHeader = String(input.authorizationHeader ?? "");
  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) {
    throw new HttpException(UNAUTHORIZED, "Missing bearer token");
  }

  try {
    const decoded = await getAuth().verifyIdToken(token);
    return decoded.uid;
  } catch {
    throw new HttpException(UNAUTHORIZED, "Invalid auth token");
  }
}
