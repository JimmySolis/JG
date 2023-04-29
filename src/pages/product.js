import React from "react";
import { Link } from "react-router-dom";
import '../product.css';

export default function ProductPage() {

    const relocate = () => {
        console.log('clicked');
        window.location.href='/';

    }
    

  return (
    <div>
      <header className="header">
        <button onClick={relocate}>Home</button>
        <h1>James Geovanny</h1>
        <button>Shopping Bag</button>
      </header>
      <div className="product-container">
        <div className="product-image"></div>
        <div className="product-details">
          <h1>Product Title</h1>
          <p>Product Description goes here. This is a sample product description. Replace this with your actual product description.</p>
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
