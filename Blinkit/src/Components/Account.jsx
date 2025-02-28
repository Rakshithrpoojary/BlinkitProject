import React from "react";
import { useAuth } from "../Store/AuthContext";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import "../styles/Account.css";
import { useSelector } from "react-redux";
import AdminAccount from "./AdminAccount";

function Account({ classname }) {
  const { LogoutHandler, setisDropdownVisible } = useAuth();
  const userAccountdata = useSelector((selector) => selector.user.userdata);

  return (
    <>
      <div
        onClick={
          classname === "account-container"
            ? () => setisDropdownVisible((prev) => !prev)
            : undefined
        }
        className={classname}
      >
        <h4>My Account</h4>
        <span className="username-container">
          <p>
            {userAccountdata?.username?.length > 10
              ? `${userAccountdata?.username.slice(0, 10)}...`
              : userAccountdata?.username}
          </p>
          <p className="admin">
            {userAccountdata?.role === "admin" ? "(Admin)" : ""}
          </p>
          <Link to={"/dashboard/profile"}>
            <BsBoxArrowUpRight />
          </Link>
        </span>
        {userAccountdata?.role === "admin" && <AdminAccount />}
        <span className="links-container">
          <Link to={"/dashboard/orders"} className="sub-links">
            My Orders
          </Link>
          <Link to={"/dashboard/addadress"} className="sub-links">
            Save Address
          </Link>
          <button onClick={LogoutHandler} className="sub-btn">
            Log Out
          </button>
        </span>
      </div>
    </>
  );
}

export default Account;
