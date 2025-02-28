import React from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import "../styles/EmptyCart.css";

function EmptyCart({ closeCartpage }) {
  return (
    <div className="display-empty-cart-items-outer-container">
      <div className="cart-empty-items-display">
        <span className="cart-empty-header">
          <p id="cart-empty-heading">Cart</p>
          <p onClick={closeCartpage} id="close-empty-cart-box">
            <IoMdClose />
          </p>
        </span>
        <div className="empty-cart-container">
          <span className="cart-is-empty">
            <img src="/Category/emptycart.jpg" alt="Empty Cart" />
            <Link to="/" className="shop-now">
              <p onClick={closeCartpage}>Shop Now</p>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default EmptyCart;
