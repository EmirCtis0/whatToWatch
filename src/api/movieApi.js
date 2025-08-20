// src/api/movieApi.js

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
    if (!res.ok) throw new Error("API error");
    return res.json();
  });

// Popüler filmleri al
export const getPopularMovies = () => {
  return fetch(`${API_BASE_URL}/movie/popular`, { headers })
    .then((res) => res.json())
    .then((data) =>
      data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
        rating: movie.vote_average,
        poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
      }))
    );
};
