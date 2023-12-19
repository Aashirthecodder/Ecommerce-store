import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem('userData');

  const fetchProductById = async () => {
    try {
  
      const res = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(res.data.products);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    fetchProductById();
  }, [id]);

  const handleProduct = async () => {
    try {
     
      const productWithUserId = { ...product, userId };
      const res = await axios.post('http://localhost:5000/cartItems', productWithUserId);
      setCartItems(res.data.cart);
      console.log('Product added to cart:', product);
      alert("product added to cart")
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
  console.log(cartItems)

  return (
    <div className="container mt-5">
      <h1 className="card-title text-center"><strong>Product Detail Page</strong></h1>
      <div className="card" style={{ width: "33%" }}>
        <div className="card-body">
          <img className="card-img-top" src={`http://localhost:5000/uploads/${product.images}`} alt={product.title} />
          <h1 className="card-title">Title: {product.title}</h1>
          <p className="card-text">Description: {product.description}</p>
          <p className="card-text"><strong>Price:</strong> ${product.price}</p>

          <button onClick={handleProduct} className="btn btn-primary btn-lg btn-block">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
