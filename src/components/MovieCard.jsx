// MovieCard.jsx
import { Star, Heart, X } from 'lucide-react';

function MovieCard({
  movie,
  isFavourite,
  addToFavourites,
  removeFromFavourites,
  showRemoveButton,
  onClick  // Yeni prop!
}) {
  const liked = isFavourite ? isFavourite(movie.id) : false;

  const handleCardClick = () => {
    if (onClick) {
      onClick(movie);
    }
  };

  return (
    <div 
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer"
      onClick={handleCardClick}  // Karta tıklama
    >
      <div className="relative">
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="w-full h-64 object-cover"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full px-2 py-1 flex items-center">
          <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
          <span className="text-white text-sm font-semibold">
            {movie.rating || '8.5'}
          </span>
        </div>

        {/* Favori/Remove Butonları - Event propagation durduralım */}
        {!showRemoveButton && (
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Kart tıklama olayını durdur
              liked ? removeFromFavourites(movie.id) : addToFavourites(movie);
            }}
            className="absolute top-2 left-2 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition"
          >
            <Heart 
              className={`w-5 h-5 ${liked ? 'text-red-500 fill-current' : 'text-white'}`} 
            />
          </button>
        )}

        {showRemoveButton && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Kart tıklama olayını durdur
              removeFromFavourites(movie.id);
            }}
            className="absolute top-2 left-2 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition"
            title="Remove from favourites"
          >
            <X className="w-5 h-5 text-red-500" />
          </button>
        )}
      </div>
      
      <div className="p-3">
        <h2 className="text-lg font-semibold text-white">{movie.title}</h2>
        <p className="text-gray-400 text-sm">{movie.year}</p>
      </div>
    </div>
  );
}

export default MovieCard;