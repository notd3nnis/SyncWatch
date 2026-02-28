export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export function getTmdbApiKey(): string {
  const key = process.env.EXPO_PUBLIC_TMDB_API_KEY;
  if (!key) {
    console.warn("[TMDB] EXPO_PUBLIC_TMDB_API_KEY is not set");
    return "";
  }
  return key;
}
