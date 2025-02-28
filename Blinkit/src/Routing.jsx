import React from "react";
import App from "./App.jsx";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login.jsx";
import Home from "./Components/Home.jsx";
import Register from "./Components/Register.jsx";
import AuthContextProvider from "./Store/AuthContext.jsx";
import Profile from "./Components/Profile.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import Adress from "./Components/Adress.jsx";
import DisplayCatogoryandSubcatogory from "./Components/DisplayCatogoryandSubcatogory.jsx";
import ProductDetails from "./Components/ProductDetails.jsx";
import DisplaySearchResults from "./Components/DisplaySearchResults.jsx";
import Checkout from "./Components/Checkout.jsx";
import Success from "./Components/Success.jsx";
import MyOrders from "./Components/MyOrders.jsx";
import Cancellpayment from "./Components/Cancellpayment.jsx";
import ProtectedCatogory from "./Components/Cateogary.jsx";
import ProtectedSubcatogory from "./Components/SubCategory.jsx";
import ProtectedUploadproduct from "./Components/UploadProduct.jsx";
import ProtectedDisplayProduct from "./Components/DisplayProductContainer.jsx";
function Routing() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="profile" element={<Profile />} />
              <Route path="addadress" element={<Adress />} />
              <Route path="orders" element={<MyOrders />} />
              <Route path="category" element={<ProtectedCatogory />} />
              <Route path="subcategory" element={<ProtectedSubcatogory />} />
              <Route
                path="uploadproduct"
                element={<ProtectedUploadproduct />}
              />
              <Route
                path="displayproduct"
                element={<ProtectedDisplayProduct />}
              />
            </Route>
            <Route
              path="products/:catogoryid/:subcatid"
              element={<DisplayCatogoryandSubcatogory />}
            />
            <Route path="productdetails" element={<ProductDetails />} />
            <Route path="search" element={<DisplaySearchResults />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="success" element={<Success />} />
            <Route path="failed" element={<Cancellpayment />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default Routing;
