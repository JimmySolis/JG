import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import '../product.css';
import rome from "../img/ROME.png";

export default function Product() {
  const location = useLocation();
  const data = location.state && location.state.data;
  console.log(data); // "Hello from the previous page"

  const [hovered, setHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const relocate = () => {
    console.log('clicked');
    window.location.href = '/';
  }

  const handleMouseOver = () => {
    setHovered(true);
  }

  const handleMouseOut = () => {
    setHovered(false);
  }

  const handleImageChange = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3);
  }

  const getImageUrl = () => {
    if (hovered) {
      if (currentImageIndex === 0) {
        return data.srcSecond;
      } else if (currentImageIndex === 1) {
        return data.srcThird;
      }
    }
    return data.src;
  }

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
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}