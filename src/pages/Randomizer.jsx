import MovieCard from "../components/MovieCard"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Randomizer({ movies, addToFavourites, removeFromFavourites, isFavourite, searchQuery }) {
  const [randomMovie, setRandomMovie] = useState(null)
  const navigate = useNavigate();

  const handleRandom = () => {
    // Eğer search aktifse filtrelenmiş movies'ten, değilse tüm movies'ten seç
    const movieList = movies.length > 0 ? movies : [];
    if (movieList.length === 0) return;
    
    const movie = movieList[Math.floor(Math.random() * movieList.length)]
    setRandomMovie(movie)
  }

  return (
    <main className="p-6 bg-gray-900 min-h-screen text-white">
      
      {/* Search sonuçları bilgilendirme */}
      {searchQuery && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-300">
            Search results for: "<span className="text-red-400">{searchQuery}</span>"
          </h2>
          <p className="text-gray-400 mt-1">{movies.length} movies found</p>
        </div>
      )}

      {/* Random Movie Button */}
      <div className="mb-6 flex justify-center">
        <button
          onClick={handleRandom}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-full hover:from-red-600 hover:to-pink-600 transition-colors shadow-lg"
        >
          🎲 Pick Random Movie
        </button>
      </div>

      {/* Random movie display */}
      {randomMovie && (
          <div 
          className="mb-6 p-4 bg-gray-800 rounded-xl shadow-lg border border-gray-700 cursor-pointer hover:bg-gray-750 transition-colors"
          onClick={() => navigate(`/movie/${randomMovie.id}`)}
        >
          <div className="flex items-center space-x-4">
            {randomMovie.poster && (
              <img
                src={randomMovie.poster}
                alt={randomMovie.title}
                className="w-16 h-24 object-cover rounded-lg"
              />
            )}
            <div>
              <h2 className="text-xl font-bold text-red-400">🎬 Random Pick:</h2>
              <h3 className="text-lg font-semibold">{randomMovie.title}</h3>
              <p className="text-gray-400">Year: {randomMovie.year}</p>
              <p className="text-yellow-400">⭐ {randomMovie.rating?.toFixed(1)}</p>
              <p className="text-blue-400 text-sm mt-2">👆 Click to view details</p>
            </div>
          </div>
        </div>
      )}

      {/* Movies Grid */}
      {movies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            {searchQuery ? 'No movies found for your search.' : 'No movies available.'}
          </p>
          {searchQuery && (
            <p className="text-gray-500 mt-2">Try searching with different keywords.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavourite={isFavourite}
              addToFavourites={addToFavourites}
              removeFromFavourites={removeFromFavourites}
              onClick={() => navigate(`/movie/${movie.id}`)}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default Randomizer