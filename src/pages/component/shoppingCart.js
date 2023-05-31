import React, { useState, useEffect } from "react";
import "../../ShoppingCart.css";

const ShoppingCart = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(items); // Set cart items based on the prop
  }, [items]);

  useEffect(() => {
    // Update localStorage whenever cartItems change
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    // Load cart items from localStorage on component mount or page refresh
    const cartItemsFromStorage = localStorage.getItem("cartItems");
    if (cartItemsFromStorage) {
      setCartItems(JSON.parse(cartItemsFromStorage));
    }
  }, []);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const removeItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  const renderCartItems = () => {
    if (cartItems.length === 0) {
      return <p>No items in cart</p>;
    }

    return (
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - {item.quantity}
            <button onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <button onClick={toggleCart}>Shopping Cart</button>
      {isOpen && (
        <div className={`shopping-cart-overlay ${isOpen ? "open" : ""}`}>
          <div className="shopping-cart-content">
            <h2>Shopping Cart</h2>
            <button className="close-button" onClick={toggleCart}>
              X
            </button>
            {renderCartItems()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
