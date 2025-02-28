import React from "react";
import "../styles/success.css";
import { Link } from "react-router-dom";
function Success() {
  return (
    <div className="success-container">
      <p>Order Successfully</p>
      <Link to={"/"} id="go-home">
        Go To Home
      </Link>
    </div>
  );
}

export default Success;
