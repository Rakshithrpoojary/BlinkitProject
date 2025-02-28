import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/SubcatogoryScrollbar.css";
function SubcatogoryScrollbar() {
  const { catogoryid } = useParams();
  console.log("catogoryid", catogoryid);
  const Categorydata = useSelector((selector) => selector.category.category);
  const Catogory = Categorydata.find((catogory) => catogory._id === catogoryid);
  console.log("CatogoryCatogory", Catogory);

  return (
    <div className="SubcatogoryScrollbar-container">
      {Catogory?.SubcatogaryArray.map((subcat) => (
        <Link
          to={`/products/${Catogory._id}/${subcat._id}`}
          key={subcat._id}
          className="individual-ubcatogoryScrollbar-container"
        >
          <img
            id="subcat-img"
            alt="SubcatogoryImage"
            src={subcat.subcateogaryimage}
          />
          <p id="subcat-name">{subcat.subcatogaryname}</p>
        </Link>
      ))}
    </div>
  );
}

export default SubcatogoryScrollbar;
