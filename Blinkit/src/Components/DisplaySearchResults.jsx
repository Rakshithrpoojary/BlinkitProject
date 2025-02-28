import React from "react";
import { useSelector } from "react-redux";
import "../styles/DisplaySearchResults.css";
import { Link } from "react-router-dom";
import Addtocart from "./Addtocart";

function DisplaySearchResults() {
  const Searchresults = useSelector(
    (selector) => selector.category.searchresults
  );
  console.log("Searchresults", Searchresults);
  return (
    <div className="searchproduct-display">
      {Searchresults.length == 0 && (
        <h1 id="no-results-found">No results found</h1>
      )}
      {Searchresults?.map((product) => (
        <Link
          key={product._id}
          to={`/productdetails?product-id=${product._id}`}
          className="searchcategory-info"
        >
          <img src={product.productimage} alt="product-image" />
          <span className="searchdiscount-time">
            <p>10 min</p>
            <p>{product.productdiscount}%discount</p>
          </span>
          <p className="searchproduct-description">
            {product.productname.length > 12
              ? `${product.productname.slice(0, 12)}...`
              : product.productname}
          </p>
          <p className="searchquantity">{product.productunit}</p>
          <span className="searchprice-cart-info">
            <p className="searchproduct-price">₹{product.productprice}</p>
            <Addtocart
              product={{
                productid: product._id,
                productprice: product.productprice,
                productimage: product.productimage,
                productunit: product.productunit,
                productname: product.productname,
              }}
            />
          </span>
        </Link>
      ))}
    </div>
  );
}

export default DisplaySearchResults;
