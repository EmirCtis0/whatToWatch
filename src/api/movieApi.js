// src/api/movieApi.js
import useSWR from 'swr';

const API_BASE_URL = "https://api.themoviedb.org/3";

// senin verdiğin token
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmMxM2Y2ZDkwM2U3MWI1N2JjMzU3ZWQ4ZThmNDRjMCIsIm5iZiI6MTc1NTQyOTQ3MC4yNTksInN1YiI6IjY4YTFiYTVlNzhmM2RkZmFkNTAyZDA3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DB1vGKYTEb-2Aay3OrDhAfDdDCWsqC_NXCnTiFr84N0";

const headers = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
  "Content-Type": "application/json;charset=utf-8",
};

// fetcher fonksiyonu (SWR ile kullanabilirsin)
export const fetcher = (url) =>
  fetch(url, { headers }).then((res) => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  });

// Film verilerini dönüştürme fonksiyonu
const transformMovieData = (movies) => {
  return movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
    rating: movie.vote_average,
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
    overview: movie.overview,
    release_date: movie.release_date,
    genre_ids: movie.genre_ids,
    backdrop_path: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : null,
  }));
};

// SWR hooks
export const usePopularMovies = () => {
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/movie/popular`,
    fetcher
  );

  return {
    movies: data ? transformMovieData(data.results) : [],
    isLoading,
    error,
  };
};

export const useMovieDetails = (movieId) => {
  const { data, error, isLoading } = useSWR(
    movieId ? `${API_BASE_URL}/movie/${movieId}` : null,
    fetcher
  );

  return {
    movie: data ? {
      id: data.id,
      title: data.title,
      year: data.release_date ? data.release_date.split("-")[0] : "N/A",
      rating: data.vote_average,
      poster: data.poster_path
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : null,
      overview: data.overview,
      release_date: data.release_date,
      runtime: data.runtime,
      genres: data.genres,
      backdrop_path: data.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`
        : null,
    } : null,
    isLoading,
    error,
  };
};

export const useSearchMovies = (query) => {
  const { data, error, isLoading } = useSWR(
    query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : null,
    fetcher
  );

  return {
    movies: data ? transformMovieData(data.results) : [],
    isLoading,
    error,
  };
};

// Eski fonksiyon - geriye dönük uyumluluk için
export const getPopularMovies = () => {
  return fetch(`${API_BASE_URL}/movie/popular`, { headers })
    .then((res) => res.json())
    .then((data) => transformMovieData(data.results));
};