import React from "react";
import SubcatogoryScrollbar from "./SubcatogoryScrollbar";
import "../styles/DisplayCatogoryandSubcatogory.css";
import DisplayproductinCatogorypage from "./DisplayproductinCatogorypage";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
function DisplayCatogoryandSubcatogory() {
  const { catogoryid, subcatid } = useParams();
  const Categorydata = useSelector((selector) => selector.category.category);
  const SubCatogory = Categorydata.find(
    (catogory) => catogory._id === catogoryid
  ).SubcatogaryArray.find((subcat) => subcat._id === subcatid);
  const [openMenu, closeMenu] = useState(false);
  return (
    <div className="DisplayCatogoryandSubcatogory-conatiner">
      {window.innerWidth <= 1200 ? (
        openMenu && <SubcatogoryScrollbar />
      ) : (
        <SubcatogoryScrollbar />
      )}
      <div className="product-cat-name-conatiner">
        <p id="display-cat-name-in-sub">
          <p onClick={() => closeMenu(!openMenu)} id="menu">
            <GiHamburgerMenu />
          </p>
          {SubCatogory?.subcatogaryname}
        </p>
        <DisplayproductinCatogorypage />
      </div>
    </div>
  );
}

export default DisplayCatogoryandSubcatogory;
