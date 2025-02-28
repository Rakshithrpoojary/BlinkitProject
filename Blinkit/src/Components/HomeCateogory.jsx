import React from "react";
import "../styles/HomeCateogory.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function HomeCateogory() {
  const Categorydata = useSelector((selector) => selector.category.category);
  return (
    <div className="Home-catogory-container">
      {Categorydata?.map(
        (categories) =>
          categories.SubcatogaryArray.length > 0 && (
            <Link
              to={`/products/${categories._id}/${categories.SubcatogaryArray[0]?._id}`}
              className="individual-home-catogory"
              key={categories._id}
            >
              <img src={categories.imageurl} alt="Categories" />
              <p>{categories.categoryname}</p>
            </Link>
          )
      )}
    </div>
  );
}

export default HomeCateogory;
