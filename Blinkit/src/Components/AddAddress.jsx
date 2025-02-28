import React, { useState } from "react";
import "../styles/AddAddress.css";
import { IoMdClose } from "react-icons/io";
import { useProvider } from "../Store/Store";
import { useSelector } from "react-redux";

function AddAddress({ closeForm, id }) {
  console.log("id", id);
  const userAccountdata = useSelector(
    (selector) => selector?.user?.userdata?.Address[id]
  );

  const { SubmitAddress } = useProvider();

  const [Address, setAddress] = useState(
    userAccountdata || {
      id: Date.now(),
      addressline: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      mobileno: "",
    }
  );
  const OnchangeHandler = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="overlay">
      <form
        onSubmit={(e) => SubmitAddress(e, Address)}
        className="add-address-form"
      >
        <span className="top-heading">
          <p>Add Address</p>
          <p onClick={closeForm}>
            <IoMdClose />
          </p>
        </span>
        <span className="form">
          <label htmlFor="addadress">Address Line :</label>
          <input
            value={Address.addressline}
            onChange={OnchangeHandler}
            name="addressline"
            id="addadress"
          />
          <label htmlFor="city">City :</label>
          <input
            value={Address.city}
            onChange={OnchangeHandler}
            name="city"
            id="city"
          />
          <label htmlFor="state">State :</label>
          <input
            value={Address.state}
            onChange={OnchangeHandler}
            name="state"
            id="state"
          />
          <label htmlFor="pincode">Pincode :</label>
          <input
            value={Address.pincode}
            onChange={OnchangeHandler}
            name="pincode"
            id="pincode"
          />
          <label htmlFor="country">Country :</label>
          <input
            value={Address.country}
            onChange={OnchangeHandler}
            name="country"
            id="country"
          />
          <label htmlFor="mobileno">Mobile No :</label>
          <input
            value={Address.mobileno}
            onChange={OnchangeHandler}
            name="mobileno"
            id="mobileno"
          />
          <button className="submit-btn">Submit</button>
        </span>
      </form>
    </div>
  );
}

export default AddAddress;
