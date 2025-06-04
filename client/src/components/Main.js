// Main.js
import React, { useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import Navbar from './Navbar';
import './Main.css';

const API_KEY = process.env.REACT_APP_API_KEY;

const Main = () => {
  const [bookData, setData] = useState([]);

  const handleSearch = (query) => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}&maxResults=40`)
      .then((res) => {
        setData(res.data.items || []);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="book-container">
        {bookData.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
};

export default Main;
