export interface SyncWatchUser {
  uid: string;
  displayName?: string;
  email?: string;
  avatarUrl?: string;
  selectedProvider?: "netflix" | "prime";
  createdAt?: string;
  updatedAt?: string;
}
