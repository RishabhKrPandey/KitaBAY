import React, { useState } from 'react';
import './Navbar.css';
import { FaSearch, FaSignOutAlt } from 'react-icons/fa';

const genres = [
  'Bestsellers', 'Fiction', 'Science', 'Technology',
  'History', 'Romance', 'Horror', 'Heartbreak',
  'Motivation', 'Spirituality', 'Science fiction', 'Manga', 'Comics'
];

const Navbar = ({ onSearch, onCartClick, cartCount, handleLogout }) => {
  const [search, setSearch] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSearch(search);
  };

  const handleClick = () => {
    onSearch(search);
  };

  const handleGenreClick = (genre) => {
    onSearch(genre);
    setSearch('');
  };

  return (
    <nav className="navbar">
      <div className="navbar-top-row">
        <div className="navbar-logo">KitaBAY</div>

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

        <div className="navbar-cart">
          <button className="cart-button" onClick={onCartClick}>
            🛒 Cart ({cartCount})
          </button>
        </div>

        <div className="navbar-right">
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
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
