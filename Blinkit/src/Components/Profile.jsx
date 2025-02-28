import React, { useState } from "react";
import "../styles/Profile.css";
import { useSelector } from "react-redux";
import { useProvider } from "../Store/Store";
function Profile() {
  const userAccountdata = useSelector((selector) => selector.user.userdata);
  console.log("userAccountdata", userAccountdata);
  const { Edituser } = useProvider();
  const [user, setUser] = useState(
    userAccountdata || { username: "", email: "" }
  );
  const OnChangeHandler = (e) => {
    const { value, name } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <form
      onSubmit={(e) => Edituser(e, user)}
      className="edit-account-details-container"
    >
      <label htmlFor="name">Name</label>
      <input
        onChange={OnChangeHandler}
        type="text"
        value={user.username}
        placeholder="Enter Your Name"
        id="profilename"
        name="username"
      />
      <label htmlFor="email">Email</label>
      <input
        onChange={OnChangeHandler}
        value={user.email}
        type="email"
        placeholder="Enter Your Email"
        id="email"
        name="email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Profile;
