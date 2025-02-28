import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { BsCart4 } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import Account from "./Account";
import LoginandAccount from "./LoginandAccount";
import { useAuth } from "../Store/AuthContext";
import { useSelector } from "react-redux";
import { useProvider } from "../Store/Store";
import Displaycartitems from "./Displaycartitems";
import EmptyCart from "./EmptyCart";
import { IoMdArrowDropright } from "react-icons/io";

function Header() {
  const { isauthenticated, isDropdownVisible } = useAuth();
  console.log(isDropdownVisible, isauthenticated);
  const userAccountdata = useSelector(
    (selector) => selector.user.userdata?.Cartitems
  );

  const price = userAccountdata?.reduce(
    (acc, item) => acc + item.productprice * item.Quantity,
    0
  );
  const Quantity = userAccountdata?.reduce(
    (acc, item) => acc + item.Quantity,
    0
  );
  const { SearchResults } = useProvider();
  const [openCart, setOpenCart] = useState(false);
  const openCartpage = () => setOpenCart(true);
  const closeCartpage = () => setOpenCart(false);
  console.log("openCart", openCart);
  return (
    <>
      <nav className="navbar-container">
        <Link to="/" className="logo-container">
          <p id="blink">𝐁𝐥𝐢𝐧𝐤</p>
          <p id="it">𝗶𝘁</p>
        </Link>
        <span className="search-container">
          <p>
            <IoSearch />
          </p>
          <Link to={"/search"}>
            <input
              onChange={(e) => SearchResults(e.target.value)}
              type="text"
              placeholder="Search..."
            />
          </Link>
        </span>
        <span className="login-cart-container">
          <LoginandAccount />
          <div id="cart-btn" onClick={openCartpage}>
            <p id="cartbbox">
              <BsCart4 />
            </p>
            {userAccountdata?.length > 0 ? (
              <>
                <span className="price-and-quantity">
                  <p>{Quantity} Items</p>
                  <p>₹{price}.00</p>
                </span>
              </>
            ) : (
              <p id="cart">My Cart</p>
            )}
          </div>
        </span>
        {isDropdownVisible && isauthenticated && (
          <Account classname="account-container" />
        )}
      </nav>
      {openCart &&
        (userAccountdata?.length > 0 ? (
          <Displaycartitems closeCartpage={closeCartpage} />
        ) : (
          <EmptyCart closeCartpage={closeCartpage} />
        ))}

      {userAccountdata?.length > 0 && (
        <div className="cart-mobile">
          <span className="span-inners">
            <p className="cart-m-icon">
              <BsCart4 />
            </p>
            <span className="cart-m-price-details">
              <p>{Quantity} Items</p>
              <p>₹{price}</p>
            </span>
          </span>
          <span onClick={openCartpage} className="cart-m-page">
            <p>View Cart</p>

            <p>
              <IoMdArrowDropright />
            </p>
          </span>
        </div>
      )}
    </>
  );
}

export default Header;
