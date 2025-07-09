import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items);
  
  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.cost.substring(1));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleContinueShopping = (e) => {
     if (onContinueShopping) {
      onContinueShopping(e);
    }
   
  };



  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
   
  };

  const handleRemove = (item) => {
     dispatch(removeItem(item.name));
  };
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1)); // Convert '$35' to 35
    return (price * item.quantity).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
        <div className="empty-cart">
        <h2>Your cart is empty.</h2>
        <button className="cart-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-total" style={{ marginTop: '20px', fontWeight: 'bold' }}>
        Total cart amount: ${calculateTotalAmount()}
      </div>
      {cartItems.map((item) => (
        
        <div className="cart-item" key={item.name}>
             
          <img
            src={item.image}
            alt={item.name}
            className="cart-item-image"
          />
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p className="cart-item-price">{item.cost}</p>
            <div className="quantity-controls">
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <p className="cart-item-total">
              Total: ${calculateTotalCost(item)}
            </p>
            <button className="delete-button" onClick={() => handleRemove(item)}>
              Delete
            </button>
          </div>
        </div>
      ))}
  
      <div className="cart-actions" style={{ marginTop: '20px' }}>
        <button className="cart-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <button className="cart-button" onClick={handleCheckoutShopping} style={{ marginLeft: '10px' }}>
          Checkout
        </button>
      </div>
    </div>
  );
};
export default CartItem; 