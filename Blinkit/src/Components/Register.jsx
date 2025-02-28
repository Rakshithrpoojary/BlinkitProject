import React, { useState } from "react";
import "../styles/Register.css";
import { BiHide, BiShow } from "react-icons/bi";
import { useAuth } from "../Store/AuthContext";

function Register() {
  const [formdata, setFormdata] = useState({
    Name: "",
    Email: "",
    Password: "",
    confirmpassword: "",
  });
  const { Registeruser } = useAuth();

  const [visible, hidden] = useState({
    Password: false,
    confirmpassword: false,
  });

  const HandleOnchange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const onClickHandler = (name) => {
    hidden((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };
  return (
    <form
      onSubmit={(e) => Registeruser(e, formdata)}
      className="login-container"
    >
      <label htmlFor="name">Name</label>
      <input
        onChange={HandleOnchange}
        type="text"
        value={formdata.Name}
        placeholder="Enter Your Name"
        id="registername"
        name="Name"
      />
      <label htmlFor="email">Email</label>
      <input
        onChange={HandleOnchange}
        type="email"
        value={formdata.Email}
        placeholder="Enter Your Email"
        id="email"
        name="Email"
      />
      <label htmlFor="password">Password</label>
      <span>
        <p onClick={() => onClickHandler("Password")}>
          {visible.Password ? <BiShow /> : <BiHide />}
        </p>
        <input
          onChange={HandleOnchange}
          id="password"
          value={formdata.Password}
          type={visible.Password ? "text" : "password"}
          placeholder="Enter Your password"
          name="Password"
        />
      </span>
      <label htmlFor="confirmpassword">Confirm Password</label>
      <span>
        <p onClick={() => onClickHandler("confirmpassword")}>
          {visible.confirmpassword ? <BiShow /> : <BiHide />}
        </p>
        <input
          onChange={HandleOnchange}
          id="confirmpassword"
          value={formdata.confirmpassword}
          type={visible.confirmpassword ? "text" : "password"}
          placeholder="Enter Your password"
          name="confirmpassword"
        />
      </span>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
