import formatDateLocally from "../utils/formatDateLocally";

const BASE_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = "b69d9e5ccb7d627bc02f3d704e5ca529";
const LANGUAGE = "es-MX";

const normalizeResults = (results) => {
  return results.map((result) => {
    const {
      id,
      title,
      release_date: releaseDate,
      backdrop_path: backdropPath,
      overview,
    } = result;

    return {
      id,
      title,
      releaseDate: formatDateLocally(releaseDate),
      backdropPath,
      overview,
    };
  });
};

export const getPopularMovies = async () => {
  const query = `${BASE_URL}/popular?api_key=${API_KEY}&language=${LANGUAGE}&page=1`;
  const res = await fetch(query);
  const { results } = await res.json();
  return normalizeResults(results);
};

export const getTopRatedMovies = async () => {
  const query = `${BASE_URL}/top_rated?api_key=${API_KEY}&language=${LANGUAGE}&page=1`;
  const res = await fetch(query);
  const { results } = await res.json();
  return normalizeResults(results);
};

export const getUpcomingMovies = async () => {
  const query = `${BASE_URL}/upcoming?api_key=${API_KEY}&language=${LANGUAGE}&page=1`;
  const res = await fetch(query);
  const { results } = await res.json();
  return normalizeResults(results);
};

export const getLatestMovies = async () => {
  const query = `${BASE_URL}/now_playing?api_key=${API_KEY}&language=${LANGUAGE}&page=1`;
  const res = await fetch(query);
  const { results } = await res.json();
  return normalizeResults(results);
};

export const getMovieDetailsById = async (movieId) => {
  const query = `${BASE_URL}/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`;
  const res = await fetch(query);
  const data = await res.json();

  const {
    id,
    title,
    release_date: releaseDate,
    backdrop_path: backdropPath,
    overview,
  } = data;

  return {
    id,
    title,
    releaseDate,
    backdropPath,
    overview,
  };
};

export const getFavoritesMoviesWithDetails = async (moviesArray) => {
  const favoritesMovies = await Promise.all(
    moviesArray.map(async ({ movieId }) => {
      return getMovieDetailsById(movieId);
    })
  );

  return favoritesMovies;
};
