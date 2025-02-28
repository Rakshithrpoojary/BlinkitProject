import React from "react";
import "../styles/ProductDescriptionDetails.css";
import Addtocart from "./Addtocart";
function ProductDescriptionDetails({ Products }) {
  return (
    <div className="productDescriptionDetails-container">
      <div className="product-description-header">
        <p id="time">10 Min</p>
        <p id="name">{Products?.productname}</p>
        <p id="unit">{Products?.productunit}</p>
      </div>
      <span className="product-description-content">
        <p id="price-name">Price</p>
        <div className="product-description-price">
          <p id="price-value">₹{Products?.productprice}</p>
          {Products?.productdiscount > 0 && (
            <>
              <p id="original-price">₹{Products?.productoriginalprice}</p>
              <p id="discount-percentage">
                {Products?.productdiscount}% Discount
              </p>
            </>
          )}
        </div>
        <div id="btn-conatiner-add-to-cart">
          <Addtocart
            product={{
              productid: Products._id,
              productprice: Products.productprice,
              productimage: Products.productimage,
              productunit: Products.productunit,
              productname: Products.productname,
            }}
          />
        </div>
        <div className="about-app">
          <p id="why-blinkit">Why shop from binkeyit?</p>
          <div className="about-delivery">
            <span className="about-superfast-delivery">
              <img src="/Category/Delivery.png" />
              <div className="superfast-delivery-details">
                <p id="super-fast-title">Superfast Delivery</p>
                <p id="super-fast-description">
                  Get your orer delivered to your doorstep at the earliest from
                  dark stores near you.
                </p>
              </div>
            </span>
            <span className="about-offers">
              <img src="/Category/bestprices.png" />
              <div className="about-offer-details">
                <p id="best-offer-title">Best Prices & Offers</p>
                <p id="best-offer-description">
                  Best price destination with offers directly from the
                  nanufacturers.
                </p>
              </div>
            </span>
            <span className="about-spread">
              <img src="/Category/wide.png" />
              <div className="about-spread-details">
                <p id="wide-title">Wide Assortment</p>
                <p id="wide-description">
                  Choose from 5000+ products across food personal care,
                  household & other categories.
                </p>
              </div>
            </span>
          </div>
        </div>
      </span>
    </div>
  );
}

export default ProductDescriptionDetails;
