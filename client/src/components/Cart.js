import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, updateQuantity }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="cart-details">
                <h4>{item.title}</h4>
                <p>₹{item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <strong>Total: ₹{total}</strong>
            <button className="checkout-btn">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
