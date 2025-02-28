import React from "react";
import "../styles/Displaycartitems.css";
import { IoMdClose } from "react-icons/io";
import Addtocart from "../Components/Addtocart";
import { IoMdArrowDropright } from "react-icons/io";
import { useSelector } from "react-redux";
import BillContainer from "./BillContainer";
import { Link } from "react-router-dom";
function Displaycartitems({ closeCartpage }) {
  const userAccountdata = useSelector(
    (selector) => selector.user.userdata.Cartitems
  );
  const price = userAccountdata?.reduce(
    (acc, item) => acc + item.productprice * item.Quantity,
    0
  );
  return (
    <div className="display-cart-items-outer-container">
      <div className="cart-items-display">
        <span className="cart-header">
          <p id="cart-heading">Cart</p>
          <p onClick={closeCartpage} id="close-cart-box">
            <IoMdClose />
          </p>
        </span>
        <span className="total-savings-container">
          <div className="total-savings-sub">
            <p>Your total savings</p>
            <p>₹418.00</p>
          </div>
        </span>
        <span className="cart-items-display-cln">
          {userAccountdata?.map((cartitem) => (
            <div key={cartitem._id} className="individula-cart-itemss">
              <img src={cartitem.productimage} width={100} />
              <span className="item-detailss">
                <p id="productnamee">
                  {cartitem.productname.length > 15
                    ? `${cartitem.productname.slice(0, 15)}...`
                    : cartitem.productname}
                </p>
                <p id="productunit">{cartitem.productunit}</p>
                <p id="productprice">₹{cartitem.productprice}</p>
              </span>
              <Addtocart
                product={{
                  productid: cartitem.productid,
                  productprice: cartitem.productprice,
                  productimage: cartitem.productimage,
                  productunit: cartitem.productunit,
                  productname: cartitem.productname,
                }}
              />
            </div>
          ))}
        </span>
        <BillContainer />
        <div className="proceed-container">
          <p id="gtotal">₹{price}</p>
          <Link id="proceed" to="/checkout">
            <p onClick={closeCartpage}>Proceed</p>

            <p>
              <IoMdArrowDropright />
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Displaycartitems;
