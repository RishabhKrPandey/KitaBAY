// Navbar.js
import React, { useState } from 'react';
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';

const genres = [
  'Bestsellers', 'Fiction', 'Science', 'Technology',
  'History', 'Romance', 'Horror', 'Heartbreak',
  'Motivation', 'Spirituality', 'Science fiction', 'Manga', 'Comics'
];

const Navbar = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(search);
    }
  };

  const handleClick = () => {
    onSearch(search);
  };

  const handleGenreClick = (genre) => {
    onSearch(genre);
    setSearch(''); // optional: clear input on genre click
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">KitaBAY

        
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search for books"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleClick}>
          <FaSearch />
        </button>
      </div>

      <div className="navbar-genres">
        {genres.map((genre) => (
          <button
            key={genre}
            className="genre-button"
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
