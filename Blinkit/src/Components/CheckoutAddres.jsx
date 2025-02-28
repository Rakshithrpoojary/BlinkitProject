import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/CheckoutAddres.css";
import AddAddress from "../Components/AddAddress";
function CheckoutAddres() {
  const [openAddressForm, setopenAddressForm] = useState({
    isOpen: false,
    id: null,
  });

  const userAccountdata = useSelector((selector) => selector.user.userdata);
  const addresses = userAccountdata?.Address || [];
  const handleOpen = (index = null) =>
    setopenAddressForm({ isOpen: true, id: index });
  const handleClose = () => setopenAddressForm({ isOpen: false, id: null });
  const [checked, setchecked] = useState();
  return (
    <div className="checkout-address-container">
      {userAccountdata?.Address?.length < 2 && (
        <button
          onClick={() => handleOpen()}
          className="checkout-add-adress-btn"
        >
          Add Address
        </button>
      )}
      <div className="address-full">
        {addresses?.length > 0 &&
          addresses?.map((address, index) => (
            <div
              onClick={() => setchecked(index)}
              key={address.id}
              className="checkout-display-address"
            >
              <input checked={checked === index} type="radio" />
              <span className="checkout-address-list">
                <p>{address.addressline}</p>
                <p>{address.country}</p>
                <p>{address.state}</p>
                <p>{address.city}</p>
                <p>{address.pincode}</p>
                <p>{address.phoneno}</p>
              </span>
            </div>
          ))}
      </div>
      {openAddressForm.isOpen && (
        <AddAddress id={openAddressForm.id} closeForm={() => handleClose()} />
      )}
    </div>
  );
}

export default CheckoutAddres;
