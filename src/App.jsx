import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import MovieDetails from './pages/MovieDetails';

function App() {
  const [favourites, setFavourites] = useState([]);

  const addToFavourites = (movie) => {
    setFavourites(prev => [...prev, movie]);
  };

  const removeFromFavourites = (movieId) => {
    setFavourites(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isFavourite = (movieId) => {
    return favourites.some(movie => movie.id === movieId);
  };

  // movies dizisini App seviyesinde tanımlayın (Home ve MovieDetails için ortak olsun)
  const movies = [
    {
      id: 1,
      title: "The Dark Knight",
      year: 2008,
      poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      rating: 9.0,
      description: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets."
    },
    {
      id: 2,
      title: "Interstellar",
      year: 2014,
      poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
      rating: 8.7,
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    },
    {
      id: 3,
      title: "Tenet",
      year: 2020,
      poster: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
      rating: 7.4,
      description: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time."
    }
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Header />
        <main>
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
        </main>
      </div>
    </Router>
  );
}

export default App;