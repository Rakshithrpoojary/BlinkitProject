import React from "react";
import { useSelector } from "react-redux";
import "../styles/DisplayProduct.css";
import { useProvider } from "../Store/Store";
import { Link } from "react-router-dom";

function DisplayProduct() {
  const { DeleteProduct } = useProvider();
  const Searchresults = useSelector(
    (selector) => selector.category.searchresults
  );
  return (
    <div className="product-container">
      {Searchresults.map((products) => (
        <div key={products._id} className="individual-product">
          <img src={products.productimage} />
          <p id="productname">{products.productname}</p>
          <p id="unit">{products.productunit} Unit</p>
          <span className="product-btn-container">
            <Link
              to={`/dashboard/uploadproduct?product=${products._id}`}
              id="edit-btn"
            >
              Edit
            </Link>
            <button
              onClick={() =>
                DeleteProduct({
                  catgeoryid: products.selectcateogary,
                  subcatid: products.selectsubcateogary,
                  productid: products._id,
                })
              }
              id="delete-btn"
            >
              Delete
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}

export default DisplayProduct;
