import React, { useRef } from "react";
import "../styles/HomeCategoryDetails.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import Addtocart from "./Addtocart";
function HomeCategoryDetails() {
  const scrollref = useRef([]);
  const Categorydata = useSelector((selector) => selector.category.category);

  const ScrollX = (index, direction) => {
    if (scrollref.current[index]) {
      scrollref.current[index].scrollBy({
        left: direction === "right" ? 300 : -300,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="display-producthome-page">
      {Categorydata.map(
        (cateogory, index) =>
          cateogory.SubcatogaryArray.some((sub) => sub.Products.length > 0) && (
            <div
              key={cateogory._id}
              className="individula-cateogory-details-container"
            >
              <p onClick={() => ScrollX(index, "right")} id="scroll-right">
                <MdOutlineKeyboardArrowRight />
              </p>
              <span className="Category-header">
                <h4>{cateogory.categoryname}</h4>
                <Link
                  id="see-all"
                  to={`/products/${cateogory._id}/${cateogory.SubcatogaryArray[0]._id}`}
                >
                  See All
                </Link>
              </span>
              <div
                ref={(el) => (scrollref.current[index] = el)}
                className="product-display"
              >
                {cateogory.SubcatogaryArray.map((subcat) =>
                  subcat.Products.map((product) => (
                    <Link
                      key={product._id}
                      to={`/productdetails?product-id=${product._id}`}
                      className="category-info"
                    >
                      <img src={product.productimage} alt="product-image" />
                      <span className="discount-time">
                        <p>10 min</p>
                        <p>{product.productdiscount}%discount</p>
                      </span>
                      <p className="product-description">
                        {product.productname.length > 12
                          ? `${product.productname.slice(0, 12)}...`
                          : product.productname}
                      </p>
                      <p className="quantity">{product.productunit}</p>
                      <span className="price-cart-info">
                        <p className="product-price">₹{product.productprice}</p>
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
                  ))
                )}
              </div>
              <p onClick={() => ScrollX(index, "left")} id="scroll-left">
                <MdOutlineKeyboardArrowLeft />
              </p>
            </div>
          )
      )}
    </div>
  );
}

export default HomeCategoryDetails;
