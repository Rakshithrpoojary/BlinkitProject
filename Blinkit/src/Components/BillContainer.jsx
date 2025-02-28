import React from "react";
import { useSelector } from "react-redux";
import "../styles/Displaycartitems.css";

function BillContainer() {
  const userAccountdata = useSelector(
    (selector) => selector.user.userdata.Cartitems
  );
  const price = userAccountdata?.reduce(
    (acc, item) => acc + item.productprice * item.Quantity,
    0
  );
  const items = userAccountdata?.reduce((acc, item) => acc + item.Quantity, 0);
  return (
    <div className="bill-container">
      <p className="bill-details">Bill details</p>
      <span className="inner-container">
        <div className="item-total">
          <p>Items Total</p>
          <p>₹{price}</p>
        </div>
        <div className="item-quantity">
          <p>Quantity Total</p>
          <p>{items} item</p>
        </div>
        <div className="delivery-charge">
          <p>delivery Charge</p>
          <p>Free</p>
        </div>
        <div className="grand-total">
          <p>Grand Total</p>
          <p>₹{price}</p>
        </div>
      </span>
    </div>
  );
}

export default BillContainer;
