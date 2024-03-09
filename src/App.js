import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./Components/ProductList";
import ProductDetails from "./Components/ProductDetails";
import AddToCart from "./Components/AddToCart";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/prod-details/:prodId" element={<ProductDetails />} />
            <Route path="/add-to-cart/:prodId" element={<AddToCart />} />
          </Routes>
        </div>
      </Router>

    </>
  );
}

export default App;