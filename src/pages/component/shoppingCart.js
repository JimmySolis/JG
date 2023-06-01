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

  const renderCartItems = () => {
    if (items.length === 0) {
      return <p>No items in cart</p>;
    }

    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <img src={item.icon} alt={item.name} className="item-icon" />
            {item.name}
            {item.size && ` - ${item.size}`}

            <button onClick={() => increaseQuantity(index)}>+</button>
            {item.quantity}
            <button onClick={() => decreaseQuantity(index)}>-</button>
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
            <div className="cart-items-container">{renderCartItems()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
