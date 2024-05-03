import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from './configs/firebase'; 
import { doc, getDoc } from 'firebase/firestore';


function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productRef = doc(firestore, "products", productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          console.log("No such product!");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <Navigate to="/" />;
  }

  return (
    <div className="product-details">
      <img src={product.image_url} alt={product.product_name} className="product-image" />
        <div className="card-body">
          <h1 className="product-name">{product.product_name}</h1>
          <p className="product-description">{product.product_description}</p>
          <p className="product-quantity">Quantity: {product.quantity}</p>
          <p className="product-price">Price: {product.price}</p>
        </div>
    </div>
  );
}

export default ProductDetails;