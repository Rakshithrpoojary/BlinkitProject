import React from "react";
import "../styles/DisplayproductinCatogorypage.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Addtocart from "../Components/Addtocart";
function DisplayproductinCatogorypage() {
  const { catogoryid, subcatid } = useParams();
  console.log("catid,subcatid", catogoryid, subcatid);
  const Categorydata = useSelector((selector) => selector.category.category);
  const SubCatogory = Categorydata.find(
    (catogory) => catogory._id === catogoryid
  ).SubcatogaryArray.find((subcat) => subcat._id === subcatid);
  return (
    <div className="product-display-cat-page">
      {SubCatogory.Products.length > 0 &&
        SubCatogory.Products.map((product) => (
          <span key={product._id} className="category-info-cat-page">
            <img src={product.productimage} alt="product-image" />
            <span className="discount-time-cat-page">
              <p>10 min</p>
              <p>{product.productdiscount}%discount</p>
            </span>
            <p className="product-description-cat-page">
              {product.productdescription.length > 12
                ? `${product.productdescription.slice(0, 12)}...`
                : product.productdescription}
            </p>
            <p className="quantity-cat-page">{product.productunit}</p>
            <span className="price-cart-info-cat-page">
              <p className="product-price-cat-page">₹{product.productprice}</p>
              <Addtocart
                product_id={product._id}
                price={product.productprice}
              />
            </span>
          </span>
        ))}
    </div>
  );
}

export default DisplayproductinCatogorypage;
