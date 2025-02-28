import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import { BiHide, BiShow } from "react-icons/bi";
import { useAuth } from "../Store/AuthContext";

function Login() {
  const [loginDetails, setloginDetails] = useState({ Email: "", Password: "" });
  const { LoginHandler } = useAuth();
  const [visible, hidden] = useState(false);

  const HadleOnchange = (e) => {
    const { name, value } = e.target;
    setloginDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={(e) => LoginHandler(e, loginDetails)}
      className="login-container"
    >
      <label htmlFor="email">Email</label>
      <input
        onChange={HadleOnchange}
        type="email"
        value={loginDetails.Email}
        placeholder="Enter Your Email"
        id="email"
        name="Email"
      />
      <label htmlFor="password">Password</label>
      <span>
        <p onClick={() => hidden(!visible)}>
          {visible ? <BiShow /> : <BiHide />}
        </p>
        <input
          value={loginDetails.Password}
          onChange={HadleOnchange}
          id="password"
          type={visible ? "text" : "password"}
          placeholder="Enter Your password"
          name="Password"
        />
      </span>
      <Link id="forgot-password">Forgot Password?</Link>
      <button>𝐋𝐨𝐠𝐢𝐧</button>
      <p>
        𝐃𝐨𝐧'𝐭 𝐡𝐚𝐯𝐞 𝐚𝐜𝐜𝐨𝐮𝐧𝐭?
        <Link to="/register" id="register">
          𝐑𝐞𝐠𝐢𝐬𝐭𝐞𝐫
        </Link>
      </p>
    </form>
  );
}

export default Login;
