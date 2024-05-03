import React, { useState, useEffect } from 'react';
import ProductCard from "./Product";
import { Link } from "react-router-dom";


function ProductList({ productList }) {
  return (
    <>
      {productList.map((product) => (
        <Link key={product.id} to={`/product/${product.id}`} className="product-link">
        </Link>
      ))}
    </>
  );
}
export default ProductList;