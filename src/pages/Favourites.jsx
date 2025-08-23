import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

function Favourites({ favourites, removeFromFavourites, isFavourite, searchQuery }) {
  const navigate = useNavigate();

  // If there is a search query, filter favourites accordingly
  const filteredFavourites = searchQuery
    ? favourites.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : favourites;

  if (filteredFavourites.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        {searchQuery ? (
          <>
            <h2 className="text-xl font-semibold text-gray-300 mb-2">
              Search results for: "<span className="text-red-400">{searchQuery}</span>"
            </h2>
            <p className="text-gray-400 text-lg">No movies found for your search.</p>
            <p className="text-gray-500 mt-2">Try searching with different keywords.</p>
          </>
        ) : (
          <p className="text-gray-400 text-lg">No favourite movies yet.</p>
        )}
      </main>
    );
  }

  return (
    <main className="p-6 bg-gray-900 min-h-screen text-white">
      {searchQuery && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-300">
            Search results for: "<span className="text-red-400">{searchQuery}</span>"
          </h2>
          <p className="text-gray-400 mt-1">{filteredFavourites.length} movies found</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredFavourites.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavourite={isFavourite}
            removeFromFavourites={removeFromFavourites}
            showRemoveButton
            onClick={() => navigate(`/movie/${movie.id}`)}
          />
        ))}
      </div>
    </main>
  );
}

export default Favourites;