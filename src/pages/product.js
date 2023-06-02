import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import ShoppingCart from "../pages/component/shoppingCart";
import "../product.css";

export default function Product() {
  const location = useLocation();
  const data = location.state && location.state.data;

  const [hovered, setHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const initialCartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [errorMessage, setErrorMessage] = useState("");

  const [isShaking, setIsShaking] = useState(false);
  const [isSizeSelected, setIsSizeSelected] = useState(true);
  
  const [buttonState, setButtonState] = useState("Add to Cart");

  const relocate = () => {
    window.location.href = "/JG/";
  };

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseOut = () => {
    setHovered(false);
  };

  const handleImageChange = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
    setIsSizeSelected(event.target.value !== "");
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(Number(event.target.value));
  };

  const handleAddToCart = () => {
    if (data.sizes && selectedSize === "") {
      setErrorMessage("Select a size!");
      setIsShaking(true);

      setTimeout(() => {
        setErrorMessage("");
        setIsShaking(false);
      }, 3000);

      setButtonState("Select a size");

      setTimeout(() => {
        setButtonState("Add to Cart");
      }, 3000);

      return;
    }

    const existingItem = cartItems.find(
      (item) => item.name === data.name && item.size === selectedSize
    );

    if (existingItem) {
      const updatedItems = cartItems.map((item) => {
        if (item.name === data.name && item.size === selectedSize) {
          return {
            ...item,
            quantity: item.quantity + selectedQuantity,
          };
        }
        return item;
      });

      setCartItems(updatedItems);
    } else {
      const newItem = {
        id: data.id,
        name: data.name,
        size: selectedSize,
        quantity: selectedQuantity,
        icon: data.icon,
        price: data.price
      };
      setCartItems([...cartItems, newItem]);
    }

    setButtonState("Added");

    setTimeout(() => {
      setButtonState("Add to Cart");
    }, 3000);
  };

  const getImageUrl = () => {
    if (hovered) {
      if (currentImageIndex === 0) {
        return data.srcSecond;
      } else if (currentImageIndex === 1) {
        return data.srcThird;
      }
    }
    return data.src;
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div>
      <header className="header">
        <button onClick={relocate}>Home</button>
        <h1>James Geovanny</h1>
        <ShoppingCart items={cartItems} setItems={setCartItems} />
      </header>
      <div className="product-container">
        <div
          className="product-image"
          style={{ backgroundImage: `url(${getImageUrl()})` }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={handleImageChange}
        ></div>
        <div className="product-details">
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          {data.sizes && data.sizes.length > 0 && (
            <div>
              <label htmlFor="size">Size:</label>
              <select
                id="size"
                value={selectedSize}
                onChange={handleSizeChange}
              >
                <option value="">Select a size</option>
                {data.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <select
              id="quantity"
              value={selectedQuantity}
              onChange={handleQuantityChange}
            >
              {[1, 2, 3, 4, 5].map((quantity) => (
                <option key={quantity} value={quantity}>
                  {quantity}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddToCart}
            className={isShaking ? "shake" : ""}
            style={{
              color: isSizeSelected ? "white" : "red",
              backgroundColor:
                buttonState === "Added" ? "#0079f2" : "#000000",
            }}
          >
            {buttonState}
          </button>
          {errorMessage && console.log("Select a size")}
        </div>
      </div>
    </div>
  );
}
