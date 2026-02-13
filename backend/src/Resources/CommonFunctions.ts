const INVITE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const PARTICIPANT_COLORS = [
  "#FEC500",
  "#00D95F",
  "#9E9E9E",
  "#FF007B",
  "#7130F0",
  "#0077E6",
  "#FF6B00",
  "#26C6DA",
];

export function nowIso(): string {
  return new Date().toISOString();
}

export function randomInviteCode(length = 6): string {
  let value = "";
  for (let i = 0; i < length; i++) {
    value += INVITE_ALPHABET[Math.floor(Math.random() * INVITE_ALPHABET.length)];
  }
  return value;
}

export function formatDateLabel(input?: unknown): string {
  const fallback = new Date();
  if (!input) {
    return fallback.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }

  if (typeof input === "string") {
    const parsed = new Date(input);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    }
  }

  if (typeof input === "object" && input !== null && "toDate" in input) {
    const parsed = (input as { toDate: () => Date }).toDate();
    return parsed.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }

  return fallback.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function colorFromSeed(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const index = Math.abs(hash) % PARTICIPANT_COLORS.length;
  return PARTICIPANT_COLORS[index];
}
