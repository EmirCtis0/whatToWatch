import MovieCard from "../components/MovieCard"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Home({ movies, addToFavourites, removeFromFavourites, isFavourite, searchQuery }) {
  const navigate = useNavigate();

 

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

export default Home