import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SWRConfig } from 'swr';
import Header from './components/Header';
import Home from './pages/Home';
import Randomizer from './pages/Randomizer';
import Favourites from './pages/Favourites';
import MovieDetails from './pages/MovieDetails';
import { usePopularMovies } from './api/movieApi';

// SWR konfigürasyonu
const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 60000, // 1 dakika
  errorRetryCount: 3,
  errorRetryInterval: 5000, // 5 saniye
  onError: (error) => {
    console.error('SWR Error:', error);
  },
};

// Ana uygulama bileşeni
function AppContent() {
  const [favourites, setFavourites] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Search state'ini App.jsx'e taşıdık
  const { movies, isLoading, error } = usePopularMovies();

  const addToFavourites = (movie) => {
    setFavourites((prev) => {
      // Zaten favorilerde mi kontrol et
      if (prev.some(fav => fav.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeFromFavourites = (movieId) => {
    setFavourites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavourite = (movieId) => {
    return favourites.some((movie) => movie.id === movieId);
  };

  // Search fonksiyonu - movies'i filtrele
  const getFilteredMovies = () => {
    if (!searchQuery.trim()) {
      return movies;
    }
    
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Error handling
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-xl font-bold mb-2">An Error Occured</h2>
          <p className="text-gray-300">{error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      <main>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center text-white">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
              <p>Loading Movies...</p>
            </div>
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  movies={getFilteredMovies()} // Filtrelenmiş movieler
                  favourites={favourites}
                  addToFavourites={addToFavourites}
                  removeFromFavourites={removeFromFavourites}
                  isFavourite={isFavourite}
                  searchQuery={searchQuery} // Search query'yi Home'a geç
                />
              }
            />
            <Route
              path="/randomizer"
              element={
                <Randomizer
                  movies={getFilteredMovies()} // Filtrelenmiş movieler
                  favourites={favourites}
                  addToFavourites={addToFavourites}
                  removeFromFavourites={removeFromFavourites}
                  isFavourite={isFavourite}
                  searchQuery={searchQuery}
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
                  searchQuery={searchQuery}
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
  );
}

function App() {
  return (
    <SWRConfig value={swrConfig}>
      <Router>
        <AppContent />
      </Router>
    </SWRConfig>
  );
}

export default App;