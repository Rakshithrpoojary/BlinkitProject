import React from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useAuth } from "../Store/AuthContext";
import { Link } from "react-router-dom";

function LoginandAccount() {
  const { isauthenticated, isDropdownVisible, setisDropdownVisible } =
    useAuth();

  return (
    <>
      {isauthenticated ? (
        <button
          onClick={() => setisDropdownVisible((prev) => !prev)}
          to="/login"
          id="account-btn"
        >
          Account {isDropdownVisible ? <MdArrowDropUp /> : <MdArrowDropDown />}
        </button>
      ) : (
        <Link to="/login" id="login-link">
          Login
        </Link>
      )}
    </>
  );
}

export default LoginandAccount;
