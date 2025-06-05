import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import Navbar from './Navbar';
import Cart from './Cart';
import { useNavigate } from 'react-router-dom';
import './Main.css';

const API_KEY = process.env.REACT_APP_API_KEY;

const Main = () => {
  const [bookData, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}&maxResults=40`)
      .then((res) => {
        setData(res.data.items || []);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    // Initial search when component mounts
    handleSearch('bestsellers'); 
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const addToCart = (book) => {
    const info = book.volumeInfo;
    const sale = book.saleInfo;
    const price =
      sale?.saleability === 'FOR_SALE' && sale?.retailPrice?.amount
        ? sale.retailPrice.amount
        : 400;

    const item = {
      id: book.id,
      title: info.title,
      price,
      quantity: 1,
      image: info.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
    };

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === book.id);
      if (existing) {
        return prev.map((i) =>
          i.id === book.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, item];
    });
  };

  const updateQuantity = (bookId, amount) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === bookId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // 👇 Handle click outside to close cart
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen]);

  return (
    <>
      <Navbar
        onSearch={handleSearch}
        onCartClick={toggleCart}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        handleLogout={handleLogout}
      />

      {isCartOpen && (
        <div ref={cartRef}>
          <Cart cartItems={cartItems} updateQuantity={updateQuantity} />
        </div>
      )}

      <div className="book-container">
        {bookData.map((book) => (
          <BookCard key={book.id} book={book} addToCart={addToCart} />
        ))}
      </div>
    </>
  );
};

export default Main;
