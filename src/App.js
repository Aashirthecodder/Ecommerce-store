import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import Hello from "./hello";
import * as React from "react";
// import { createRoot } from "react-dom/client";
// import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
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
