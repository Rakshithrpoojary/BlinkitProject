import React from "react";
import CheckoutAddres from "./CheckoutAddres";
import BillContainer from "./BillContainer";
import "../styles/Checkout.css";
import { useProvider } from "../Store/Store";
import { useSelector } from "react-redux";
function Checkout() {
  const { PlaceOrder } = useProvider();
  const userAccountdata = useSelector((selector) => selector.user.userdata);
  const { StripePayment } = useProvider();
  return (
    <div className="checkout-container">
      <h4>Choose Your Address</h4>
      <div className="checkout-sub-container">
        <CheckoutAddres />
        <div className="bill-c">
          <BillContainer />
          {userAccountdata?.Address.length > 0 && (
            <div className="link-c">
              <button
                onClick={() => StripePayment(userAccountdata?.Cartitems)}
                id="online"
              >
                Online Payment
              </button>
              <button onClick={PlaceOrder} id="cash">
                Cash on Delivery
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
