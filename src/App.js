import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";


import * as React from "react";
// import { createRoot } from "react-dom/client";
// import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
// import CheckoutPage from "./pages/CheckoutPage";
import Sellerpage from "./pages/Sellerpage"
import ProductDetailsPage from "./pages/ProductDetailsPage";
// import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemByUserIdAsync,  } from "./features/cart/CartSlice";
import { useEffect } from "react";
// import PageNotFound from "./pages/404";
// import OrderSuccessPage from "./pages/OrderSuccessPage";
// import Products2 from "./pages/Products2";
// import ProductDetails2 from "./pages/ProductDetails2";
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  // const items = useSelector(selectItems);

  // console.log(user);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemByUserIdAsync(user.id));
    }
  }, [dispatch, user]);

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
          {/* <Route
            exact
            path="/checkoutPage"
            element={
              <Protected>
                <CheckoutPage />{" "}
              </Protected>
            }
          ></Route> */}
          <Route
            exact
            path="/cart"
            element={
              
                <CartPage />
          
            }
          ></Route>
          {/* <Route exact path="*" element={<PageNotFound />}></Route> */}
          {/* <Route exact path="/orderSucess/:id" element={<OrderSuccessPage />}></Route> */}
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
      {/* <RouterProvider router={router} />; */}
    </div>
  );
}

export default App;
