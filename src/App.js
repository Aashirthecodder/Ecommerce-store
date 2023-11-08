import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";

import Hello from "./hello";
import * as React from "react";
// import { createRoot } from "react-dom/client";
// import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/ProductDetails" element={<ProductDetailsPage />}></Route>
          <Route exact path="/checkoutPage" element={<CheckoutPage />}></Route>
          <Route exact path="/cart" element={<CartPage />}></Route>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/Login" element={<LoginPage />}></Route>
          <Route exact path="/Signup" element={<SignupPage />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <RouterProvider router={router} />; */}
    </div>
  );
}

export default App;
