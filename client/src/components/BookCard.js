import React from 'react';
import './BookCard.css';

const BookCard = ({ book }) => {
  const info = book.volumeInfo;
  const sale = book.saleInfo;

  // Check if price is available, otherwise default to ₹400
  const price =
    sale?.saleability === "FOR_SALE" && sale?.retailPrice?.amount
      ? sale.retailPrice.amount
      : 400;

  return (
    <div className="book-card">
      <img
        className="book-image"
        src={info.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
        alt={info.title}
      />
      <div className="book-details">
        <h3 className="book-title">{info.title}</h3>
        <p className="book-author">{info.authors?.join(', ') || 'Unknown Author'}</p>
        <p className="book-price">₹{price}</p>

        {info.previewLink && (
          <a
            className="book-preview"
            href={info.previewLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Add to Cart 
          </a>

          
        )}
      </div>
    </div>
  );
};

export default BookCard;
