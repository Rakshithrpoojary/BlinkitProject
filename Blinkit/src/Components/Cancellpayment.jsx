import React from "react";
import "../styles/Cancellpayment.css";
import { Link } from "react-router-dom";
function Cancellpayment() {
  return (
    <div className="cancell-container">
      <p>Failed Payement</p>
      <Link to={"/"} id="go-back">
        Go To Home
      </Link>
    </div>
  );
}

export default Cancellpayment;
