import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Link
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './configs/firebase'; 
import ProductCard from "./Product";
import ProductDetails from './ProductDetails';

// Remove standalone ProductList component declaration

function App() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const getProductList = async () => {
      try {
        const productCollectionRef = collection(firestore, "products");
        const data = await getDocs(productCollectionRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setProductList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getProductList();
  }, []);

  return (
    <div className='App'>
    <div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UFC_Logo.svg/2560px-UFC_Logo.svg.png" className="shop" alt="Hempire" />
    </div>
    <h1 className="featured-products">Featured Products</h1>
    <Router>
      <div className="card-container">
        <Routes>
          {}
          <Route path="/product/:productId" element={<ProductDetails />} />
          {}
          <Route path="/" element={ 
            <>
              {productList.map((product) => (
                <div key={product.id} className="product-container"> {/* Container for each product */}
                  <Link to={`/product/${product.id}`} className="product-link">
                    <ProductCard product={product} />
                  </Link>
                </div>
              ))}
            </>
          } />
        </Routes>
      </div>
    </Router>
  </div>
  );
}

export default App;
