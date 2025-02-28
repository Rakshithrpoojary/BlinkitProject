import React from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { useProvider } from "../Store/Store";
import "../styles/Addtocart.css";
import { useSelector } from "react-redux";

function Addtocart({ product }) {
  const { AddtoCart, RemovefromCart } = useProvider();
  const userAccountdata = useSelector((selector) => selector.user.userdata);
  // const Price = userAccountdata;
  return (
    <div className="button-container">
      {userAccountdata?.Cartitems?.some(
        (item) => item.productid === product?.productid
      ) && (
        <>
          <button
            onClick={(event) => RemovefromCart(product?.productid, event)}
            className="add-to-cart"
          >
            <FiMinus />
          </button>
          <p>
            {
              userAccountdata?.Cartitems?.find(
                (item) => item.productid === product?.productid
              ).Quantity
            }
          </p>
        </>
      )}
      <button
        onClick={(event) => AddtoCart(product, event)}
        className="add-to-cart"
      >
        {userAccountdata?.Cartitems?.some(
          (item) => item.productid === product?.productid
        ) ? (
          <GoPlus />
        ) : (
          "Add"
        )}
      </button>
    </div>
  );
}

export default Addtocart;
