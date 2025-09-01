// src/pages/MovieDetails.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetails } from '../api/movieApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { ArrowLeft } from 'lucide-react';

const MovieDetails = ({ 
  isFavourite, 
  addToFavourites, 
  removeFromFavourites 
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, isLoading, error } = useMovieDetails(id);

  if (isLoading) {
    return <LoadingSpinner message="Loading movie details..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error} 
        title="Movie details could not be loaded"
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
          <p className="text-gray-300">The movie you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const handleFavouriteToggle = () => {
    if (isFavourite(movie.id)) {
      removeFromFavourites(movie.id);
    } else {
      addToFavourites(movie);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
        {movie.backdrop_path && (
          <div 
            className="h-64 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${movie.backdrop_path})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            
            {/* Geri Dönüş Butonu - Arka plan üzerinde */}
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-lg transition-all duration-300 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Geri Dön</span>
            </button>
          </div>
        )}
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {movie.poster && (
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-full lg:w-64 h-auto rounded-lg shadow-lg"
              />
            )}
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {movie.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-4 text-gray-300">
                <span>{movie.year}</span>
                {movie.runtime && (
                  <span>{movie.runtime} minute</span>
                )}
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{movie.rating?.toFixed(1)}</span>
                </div>
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span 
                        key={genre.id}
                        className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {movie.overview && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Overview</h3>
                  <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                </div>
              )}

              <button
                onClick={handleFavouriteToggle}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isFavourite(movie.id)
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isFavourite(movie.id) ? 'Remove from Favourites' : 'Add to Favourites'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;