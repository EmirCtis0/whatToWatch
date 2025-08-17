import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favourites from './pages/Favourites';

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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;