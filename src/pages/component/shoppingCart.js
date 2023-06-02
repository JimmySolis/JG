import React, { useState, useEffect } from "react";
import _ from "lodash";
import "../../ShoppingCart.css";

const ShoppingCart = ({ items, setItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Update local storage whenever cartItems change
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    // Load cart items from local storage on component mount
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setItems(JSON.parse(storedCartItems));
    }
  }, []);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const removeItem = (index) => {
    const updatedCartItems = items.filter((_, i) => i !== index);
    setItems(updatedCartItems);
  };

  const increaseQuantity = (index) => {
    const updatedCartItems = [...items];
    updatedCartItems[index].quantity += 1;
    setItems(updatedCartItems);
  };

  const decreaseQuantity = (index) => {
    const updatedCartItems = [...items];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity -= 1;
      setItems(updatedCartItems);
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const renderCartItems = () => {
    if (items.length === 0) {
      return <p>No items in cart</p>;
    }

    return (
      <div>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <img src={item.icon} alt={item.name} className="item-icon" />
              {item.name}
              {item.size && ` - ${item.size}`} - ${item.price} / each
              <button onClick={() => increaseQuantity(index)}>+</button>
              {item.quantity}
              <button onClick={() => decreaseQuantity(index)}>-</button>
              <button onClick={() => removeItem(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total: ${calculateTotal()}</p>
      </div>
    );
  };

  return (
    <div>
      <button onClick={toggleCart}>Shopping Cart</button>
      {isOpen && (
        <div className={`shopping-cart-overlay ${isOpen ? "open" : ""}`}>
          <div className="shopping-cart-content">
            <p className="fontSizeShoppingH">Shopping Cart</p>
            <button className="close-button" onClick={toggleCart}>
              <span role="img" aria-label="Close" className="closeButton">&#10008;</span>
            </button>
            <div className="cart-items-container">{renderCartItems()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
