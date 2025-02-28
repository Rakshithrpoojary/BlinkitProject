import React, { useState } from "react";
import "../styles/SubCategory.css";
import AddSubcateogary from "./AddSubcateogary";
import DisplaySubcatogory from "./DisplaySubcatogory";
import ProtectedRoutes from "../Components/ProtectedRoutes";
import { GiHamburgerMenu } from "react-icons/gi";

function SubCategory() {
  const [openSubcatogary, setOpenSubcatogary] = useState({
    isOpen: false,
    categoryid: null,
    subcatid: null,
  });
  const opensubcatogary = (categoryid = null, subcatid = null) =>
    setOpenSubcatogary({ isOpen: true, categoryid, subcatid });
  const closesubcatogary = () =>
    setOpenSubcatogary({ isOpen: false, categoryid: null, subcatid: null });

  return (
    <div className="subcategory-container">
      <span className="subcategory-header">
        <p id="menu-sub">Sub Category</p>
        <button onClick={() => opensubcatogary()}>Add Subcategory</button>
      </span>
      {openSubcatogary.isOpen && (
        <AddSubcateogary
          id={{
            catid: openSubcatogary.categoryid,
            subid: openSubcatogary.subcatid,
          }}
          closeSubcatogary={closesubcatogary}
        />
      )}
      <DisplaySubcatogory
        opensubcatogary={(catgoryid, subid) =>
          opensubcatogary(catgoryid, subid)
        }
      />
    </div>
  );
}
const ProtectedSubcatogory = ProtectedRoutes(SubCategory);
export default ProtectedSubcatogory;
//or
// export default  ProtectedRoutes(SubCategory)
