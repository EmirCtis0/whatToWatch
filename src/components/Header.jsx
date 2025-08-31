import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

const Header = ({ searchQuery, setSearchQuery }) => { // Props olarak al
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-red-400 transition-colors font-medium">
               <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              WhatToWatch
            </h1>
          </div>
            </Link>
            <Link to="/favourites" className="text-gray-300 hover:text-red-400 transition-colors font-medium">
              My Favourites
            </Link>
            <Link to="/randomizer" className="text-gray-300 hover:text-red-400 transition-colors font-medium">
              Randomizer
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Parent'tan gelen setSearchQuery kullan
                placeholder="Search For a Movie..."
                className="w-full bg-gray-900 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

        

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button className="p-2 text-gray-300 hover:text-red-400 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-300 hover:text-red-400 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-white hover:text-red-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Main Page
              </Link>
              <Link
                to="/favourites"
                className="block px-3 py-2 text-gray-300 hover:text-red-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                My Favourites
              </Link>
              <Link
                to="/randomizer"
                className="block px-3 py-2 text-gray-300 hover:text-red-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Randomizer
              </Link>
              <div className="px-3 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Mobil search de aynı fonksiyonu kullan
                    placeholder="Search For a Movie..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;