import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../product.css";
import rome from "../img/ROME.png";

export default function Product() {
  const location = useLocation();
  const data = location.state && location.state.data;
  console.log(data); // "Hello from the previous page"

  const [hovered, setHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const relocate = () => {
    console.log("clicked");
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
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(Number(event.target.value));
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

  return (
    <div>
      <header className="header">
        <button onClick={relocate}>Home</button>
        <h1>James Geovanny</h1>
        <button>Shopping Bag</button>
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
          {data.sizes && (
            <div>
              <label htmlFor="size">Size:</label>
              <select id="size" value={selectedSize} onChange={handleSizeChange}>
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
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
