import MovieCard from "../components/MovieCard"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Home({ movies, addToFavourites, removeFromFavourites, isFavourite }) {
// Home.jsx

  const [randomMovie, setRandomMovie] = useState(null)
  const navigate = useNavigate();

  const handleRandom = () => {
    const movie = movies[Math.floor(Math.random() * movies.length)]
    setRandomMovie(movie)
  }

  return (
    <main className="p-6 bg-gray-900 min-h-screen text-white">
     
      {randomMovie && (
        <div className="mb-6 p-4 bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold">{randomMovie.title}</h2>
          <p>{randomMovie.year}</p>
        </div>
      )}
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
    </main>
  )
}

export default Home
