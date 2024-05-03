import React from "react";
import { Link } from 'react-router-dom';

function ProductCard({ product }) {

  if (!product) {
    return null; 
  }

  return (
    <div key={product.id} className="product-container">
      <Link to={`/product/${product.id}`} className="product-link"> {}
        <img src={product.image_url} alt={product.product_name} className="product-image" />
        <div className="card-body">
          <h1 className="product-name">{product.product_name}</h1>
          <h2 className="product-description">{product.product_description}</h2>
          <p className="product-quantity">Quantity: {product.quantity}</p>
          <p className="product-price">Price: {product.price}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;