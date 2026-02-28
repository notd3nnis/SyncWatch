import {
  TMDB_BASE_URL,
  TMDB_IMAGE_BASE_URL,
  getTmdbApiKey,
} from "@/src/config/tmdb";
import { MovieProps } from "@/src/screens/homePage/CreateParty/types";

type TmdbMovieResult = {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string | null;
};

type TmdbPopularResponse = {
  results: TmdbMovieResult[];
};

function mapTmdbToMovieProps(result: TmdbMovieResult): MovieProps {
  return {
    id: result.id,
    title: result.title,
    image: result.poster_path
      ? { uri: `${TMDB_IMAGE_BASE_URL}${result.poster_path}` }
      : require("../assets/images/image1.jpg"),
    description: result.overview ?? undefined,
  };
}

/**
 * Fetches popular movies from TMDB and returns them in app MovieProps shape.
 */
export async function fetchPopularMovies(): Promise<MovieProps[]> {
  const apiKey = getTmdbApiKey();
  if (!apiKey) {
    return [];
  }
  const url = `${TMDB_BASE_URL}/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`TMDB request failed: ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as TmdbPopularResponse;
  return (data.results ?? []).map(mapTmdbToMovieProps);
}