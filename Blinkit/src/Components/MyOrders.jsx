import React from "react";
import "../styles/MyOrders.css";
import { useSelector } from "react-redux";
function MyOrders() {
  const Orders = useSelector((selector) => selector.user.userdata.Orders);
  return (
    <div className="my-Orders-container">
      <div className="my-order-title">Order</div>
      <div className="display-order-container">
        {Orders.map((order) => (
          <div className="display-individual-order">
            <p id="order-no">Order No : {order.orderid}</p>
            <span className="order-img-container">
              <img id="order-img" src={order.orderimage} alt="order-image" />
              <p id="order-name">{order.ordername}</p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
