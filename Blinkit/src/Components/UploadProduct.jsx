import React from "react";
import "../styles/UploadProduct.css";
import UploadProductForm from "./UploadProductForm";
import ProtectedRoutes from "../Components/ProtectedRoutes";

function UploadProduct() {
  return (
    <div className="uploadproduct-container">
      <span className="uploadproduct-header">
        <p>Upload Product</p>
      </span>
      <UploadProductForm />
    </div>
  );
}

const ProtectedUploadproduct = ProtectedRoutes(UploadProduct);
export default ProtectedUploadproduct;
