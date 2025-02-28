import React from "react";
import "../styles/DisplayProductContainer.css";
import SearchProduct from "./SearchProduct";
import DisplayProduct from "./DisplayProduct";
import ProtectedRoutes from "../Components/ProtectedRoutes";

function DisplayProductContainer() {
  return (
    <div className="display-product-container">
      <div className="display-product-header">
        <p>Product</p>
        <SearchProduct />
      </div>
      <DisplayProduct />
    </div>
  );
}
const ProtectedDisplayProduct = ProtectedRoutes(DisplayProductContainer);
export default ProtectedDisplayProduct;
