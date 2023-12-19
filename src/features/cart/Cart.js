import React, { useEffect } from "react";
import {  useState } from "react";
import { Link, useNavigate, } from "react-router-dom";


import axios from 'axios'

export default function Cart() {
  
  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate();
  const[order,setOrder]=useState([])
 
  const userId = localStorage.getItem('userData');
  const fetchCartItemsById = async () => {
    try {
      const userId = localStorage.getItem('userData');

      const res = await axios.get(`http://localhost:5000/cartItemsById/${userId}`);
    setCartItems(res.data.cartItems);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    fetchCartItemsById()
  }, [])


  

  

  const handleLogout=()=>{
    localStorage.clear()
  }

  const handleOrder = async () => {
    try {
      const response = await axios.post('http://localhost:5000/order', { cartItems });
      setOrder(response.data.order);
      // You can handle the response or perform additional actions after placing the order
      console.log('Order placed successfully:', response.data.order);
      alert("order placed")
     
    
    } catch (error) {
      console.error('Error placing order:', error);
    }
    


  };


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-white bg-dark">
        <div className="container-fluid">
          <span style={{ color: "white" }} className="navbar-brand mx-auto">Cart Panel</span>
          <Link to="/">
            <button onClick={handleLogout} className="btn btn-primary">Log out</button>
          </Link>
        </div>
      </nav>
      <div className="container mt-5">
        <h1 className="text-center"><strong>Cart Items</strong></h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <div key={item._id} className="col">
                <div className="card h-100" style={{width:"35%"}}>
                  <img src={`http://localhost:5000/uploads/${item.images}`} className="card-img-top" alt="Product Image" />
                  <div className="card-body">
                    <h5 className="card-title">Title: {item.title}</h5>
                    <p className="card-text">Description: {item.description}</p>
                    <p className="card-text">Price: ${item.price}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
        </div>
        <button onClick={handleOrder} className="btn btn-primary mt-5 ">place order</button>
      </div>
    </>
  );
};
