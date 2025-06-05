import React from 'react';
import './BookCard.css';

const BookCard = ({ book, addToCart }) => {
  const info = book.volumeInfo;

  const handleCardClick = () => {
    if (info.previewLink) {
      window.open(info.previewLink, '_blank');
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // prevent card click
    addToCart(book);
  };

  const price =
    book.saleInfo?.saleability === 'FOR_SALE' &&
    book.saleInfo?.retailPrice?.amount
      ? book.saleInfo.retailPrice.amount
      : 400;

  return (
    <div className="book-card" onClick={handleCardClick}>
      <img
        className="book-image"
        src={info.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
        alt={info.title}
      />
      <div className="book-details">
        <h3 className="book-title">{info.title}</h3>
        <p className="book-author">{info.authors?.join(', ') || 'Unknown Author'}</p>
        <p className="book-price">₹{price}</p>
        <button className="book-preview" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
