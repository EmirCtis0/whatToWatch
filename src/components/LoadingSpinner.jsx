import React from 'react';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div 
        className={`inline-block animate-spin rounded-full border-b-2 border-white mb-4 ${sizeClasses[size]}`}
      ></div>
      <p className="text-white text-center">{message}</p>
    </div>
  );
};

export default LoadingSpinner;