import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";


import * as React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sellerpage from "./pages/Sellerpage"
import ProductDetailsPage from "./pages/ProductDetailsPage";



function App() {



 

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/ProductDetails/:id"
            element={
             
                <ProductDetailsPage />
          
            }
          ></Route>
         
          <Route
            exact
            path="/cart"
            element={
              
                <CartPage />
          
            }
          ></Route>
        
          <Route
            path="/homepage"
            element={
           
                <Home />
            
            }
          ></Route>
      
          <Route exact path="/" element={<LoginPage />}></Route>
          <Route exact path="/Signup" element={<SignupPage />}></Route>
          <Route exact path="/sellerpage" element={<Sellerpage/>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
