// MovieDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart } from 'lucide-react';

function MovieDetails({ movies, isFavourite, addToFavourites, removeFromFavourites }) {
  const { id } = useParams(); // Get movie ID from URL
  const navigate = useNavigate(); // For navigation back

  // Find movie by ID
  const movie = movies.find(m => m.id === parseInt(id));

  // If movie is not found
  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const liked = isFavourite(movie.id);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Back Button */}
      <div className="p-6">
        <button
          onClick={() => navigate(-1)} // Go back to previous page
          className="flex items-center text-gray-300 hover:text-white transition mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Go Back
        </button>
      </div>

      {/* Movie Details */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="md:col-span-1">
           <img
  src={movie.poster}
  alt={movie.title}
  className="w-full max-w-md h-128 object-cover rounded-xl mx-auto mb-6"
/>
          </div>

          {/* Movie Information */}
          <div className="md:col-span-2 space-y-6">
            {/* Title and Year */}
            <div>
              <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
              <p className="text-gray-400 text-xl">{movie.year}</p>
            </div>

            {/* Rating and Favorite Button */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center bg-gray-800 rounded-full px-4 py-2">
                <Star className="w-6 h-6 text-yellow-400 mr-2" fill="currentColor" />
                <span className="text-xl font-semibold">{movie.rating}</span>
              </div>

              <button
                onClick={() => liked ? removeFromFavourites(movie.id) : addToFavourites(movie)}
                className={`flex items-center px-6 py-3 rounded-full transition ${
                  liked 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                <Heart 
                  className={`w-5 h-5 mr-2 ${liked ? 'fill-current' : ''}`} 
                />
                {liked ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Plot</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {movie.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;