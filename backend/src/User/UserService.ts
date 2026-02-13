import { firestore } from "../Db/firestore";
import { nowIso } from "../Resources/CommonFunctions";
import { SyncWatchUser } from "./UserTypes";

export async function getUser(uid: string): Promise<SyncWatchUser | null> {
  const snap = await firestore.doc(`users/${uid}`).get();
  if (!snap.exists) return null;
  return { uid, ...(snap.data() as Omit<SyncWatchUser, "uid">) };
}

function toUserProfile(uid: string, raw: Record<string, any>): SyncWatchUser {
  return {
    uid,
    displayName: String(raw.displayName ?? `User ${uid.slice(0, 4)}`),
    email: String(raw.email ?? ""),
    avatarUrl: String(raw.avatarUrl ?? ""),
    selectedProvider:
      raw.selectedProvider === "netflix" || raw.selectedProvider === "prime"
        ? raw.selectedProvider
        : undefined,
    createdAt: String(raw.createdAt ?? ""),
    updatedAt: String(raw.updatedAt ?? ""),
  };
}

export async function getOrCreateUserProfile(uid: string): Promise<SyncWatchUser> {
  const userRef = firestore.doc(`users/${uid}`);
  const snap = await userRef.get();

  if (!snap.exists) {
    const now = nowIso();
    const created: SyncWatchUser = {
      uid,
      displayName: `User ${uid.slice(0, 4)}`,
      email: "",
      avatarUrl: "",
      createdAt: now,
      updatedAt: now,
    };

    await userRef.set(created, { merge: true });
    return created;
  }

  return toUserProfile(uid, (snap.data() ?? {}) as Record<string, any>);
}

type UpdateProfileInput = {
  displayName?: string;
  email?: string;
  avatarUrl?: string;
};

export async function updateUserProfile(
  uid: string,
  input: UpdateProfileInput
): Promise<SyncWatchUser> {
  const update: Record<string, unknown> = {
    updatedAt: nowIso(),
  };

  if (typeof input.displayName === "string") {
    update.displayName = input.displayName.trim();
  }
  if (typeof input.email === "string") {
    update.email = input.email.trim();
  }
  if (typeof input.avatarUrl === "string") {
    update.avatarUrl = input.avatarUrl.trim();
  }

  await firestore.doc(`users/${uid}`).set(update, { merge: true });
  return getOrCreateUserProfile(uid);
}
