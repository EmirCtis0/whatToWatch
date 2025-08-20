import MovieCard from "../components/MovieCard"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Home({ favourites, addToFavourites, removeFromFavourites, isFavourite }) {
// Home.jsx
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
]

  const [randomMovie, setRandomMovie] = useState(null)
  const navigate = useNavigate();

  const handleRandom = () => {
    const movie = movies[Math.floor(Math.random() * movies.length)]
    setRandomMovie(movie)
  }

  return (
    <main className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex flex-col items-center mb-6 min-h-[80px]">
        
        <button 
          onClick={handleRandom} 
          className="px-6 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        >
          Random Movie Suggestion
        </button>
      </div>
      {randomMovie && (
        <div className="mb-6 p-4 bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold">{randomMovie.title}</h2>
          <p>{randomMovie.year}</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
