import React, { useState } from "react";
import "../styles/Adress.css";
import AddAddress from "./AddAddress";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useProvider } from "../Store/Store";

function Adress() {
  const [openAddressForm, setopenAddressForm] = useState({
    isOpen: false,
    id: null,
  });

  const userAccountdata = useSelector((selector) => selector.user.userdata);
  const addresses = userAccountdata?.Address || [];
  const handleOpen = (index = null) =>
    setopenAddressForm({ isOpen: true, id: index });
  const handleClose = () => setopenAddressForm({ isOpen: false, id: null });
  const { DeleteAddress } = useProvider();

  return (
    <div className="address-container">
      {userAccountdata?.Address?.length < 2 && (
        <button onClick={() => handleOpen()} className="add-adress-btn">
          Add Address
        </button>
      )}
      <div>
        {addresses?.length > 0 &&
          addresses?.map((address, index) => (
            <div key={address.id} className="display-address">
              <span className="address-list">
                <p>{address.addressline}</p>
                <p>{address.country}</p>
                <p>{address.state}</p>
                <p>{address.city}</p>
                <p>{address.pincode}</p>
                <p>{address.phoneno}</p>
              </span>
              <span className="edit-delete">
                <p onClick={() => handleOpen(index)}>
                  <FaEdit />
                </p>
                <p onClick={() => DeleteAddress(address.id)}>
                  <MdDelete />
                </p>
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

export default Adress;
