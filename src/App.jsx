import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import MovieDetails from './pages/MovieDetails';
import { getPopularMovies } from './api/movieApi';

function App() {
  const [favourites, setFavourites] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPopularMovies()
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setLoading(false);
      });
  }, []);

  const addToFavourites = (movie) => {
    setFavourites((prev) => [...prev, movie]);
  };

  const removeFromFavourites = (movieId) => {
    setFavourites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavourite = (movieId) => {
    return favourites.some((movie) => movie.id === movieId);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Header />
        <main>
          {loading ? (
            <div className="text-center text-white p-10">Loading...</div>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    movies={movies}
                    favourites={favourites}
                    addToFavourites={addToFavourites}
                    removeFromFavourites={removeFromFavourites}
                    isFavourite={isFavourite}
                  />
                }
              />
              <Route
                path="/favourites"
                element={
                  <Favourites
                    favourites={favourites}
                    removeFromFavourites={removeFromFavourites}
                    isFavourite={isFavourite}
                  />
                }
              />
              <Route
                path="/movie/:id"
                element={
                  <MovieDetails
                    movies={movies}
                    isFavourite={isFavourite}
                    addToFavourites={addToFavourites}
                    removeFromFavourites={removeFromFavourites}
                  />
                }
              />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;
