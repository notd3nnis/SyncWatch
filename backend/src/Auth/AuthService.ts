import { firestore } from "../Db/firestore";
import { nowIso } from "../Resources/CommonFunctions";

export async function linkProvider(uid: string, provider: string): Promise<void> {
  await firestore.doc(`users/${uid}`).set(
    {
      selectedProvider: provider,
      providerLinks: {
        [provider]: {
          status: "active",
          updatedAt: nowIso(),
        },
      },
      updatedAt: nowIso(),
    },
    { merge: true }
  );
}

export async function getProviderStatus(uid: string): Promise<{
  selectedProvider: string | null;
  platforms: Array<{ provider: "netflix" | "prime"; name: string; isActive: boolean }>;
}> {
  const userSnap = await firestore.doc(`users/${uid}`).get();
  const user = (userSnap.data() ?? {}) as Record<string, any>;
  const selectedProvider = typeof user.selectedProvider === "string" ? user.selectedProvider : null;
  const providerLinks = (user.providerLinks ?? {}) as Record<string, any>;

  return {
    selectedProvider,
    platforms: [
      {
        provider: "netflix",
        name: "Netflix",
        isActive:
          selectedProvider === "netflix" ||
          providerLinks.netflix?.status === "active" ||
          providerLinks.netflix?.status === "verified",
      },
      {
        provider: "prime",
        name: "Prime Video",
        isActive:
          selectedProvider === "prime" ||
          providerLinks.prime?.status === "active" ||
          providerLinks.prime?.status === "verified",
      },
    ],
  };
}
