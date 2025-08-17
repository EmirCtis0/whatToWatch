import MovieCard from "../components/MovieCard";

function Favourites({ favourites, removeFromFavourites, isFavourite }) {
  if (favourites.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-2xl font-bold mb-6">My Favourites</h1>
        <p className="text-gray-400 text-lg">No favourite movies yet.</p>
      </main>
    );
  }

  return (
    <main className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">My Favourites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {favourites.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavourite={isFavourite}
            removeFromFavourites={removeFromFavourites}
            showRemoveButton
          />
        ))}
      </div>
    </main>
  );
}

export default Favourites;