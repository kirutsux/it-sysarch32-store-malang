import React from "react";
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

// Load the Stripe.js library with your publishable API key
const stripePromise = loadStripe('pk_test_51PF3r9J2KRREDP2eehrcDI42PVjLhtLQuEy55mabmKa63Etlh5DxHGupzcklVCnrEE0RF6SxYUQVEbJMNph0Zalf00Va9vwLxS'); // Replace with your publishable key

function ProductCard({ product }) {

  const handlePurchase = async() => {
    // Here you can add your purchase logic
    const stripe = await stripePromise;

    // Send a request to the backend to create a checkout session
    const response = await fetch('http://34.122.128.163/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productName: product.product_name, price: product.price }), // Send product name and price to the backend
    });

    if (response.ok) {
      // If the request is successful, retrieve the session ID from the response
      const session = await response.json();

      // Redirect the user to the Stripe Checkout page using the session ID
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        // If there is an error during the redirect, display the error message
        setError(result.error.message);
      }
    } else {
      // If there is an error creating the checkout session, display an error message
      setError('Error creating checkout session');
    }
  };

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
          <button onClick={handlePurchase} className="purchase-button">Purchase</button>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;