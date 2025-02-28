import React from "react";
import "../styles/Category.css";
import { useSelector } from "react-redux";
import { useProvider } from "../Store/Store";

function DisplayCategory() {
  const Categorydata = useSelector((selector) => selector.category.category);
  const { DeleteCategory } = useProvider();
  return (
    <span className="categories">
      {Categorydata?.map((categories) => (
        <div className="individula-category-container" key={categories._id}>
          <img src={categories.imageurl} alt="Categories" />
          <p className="dispaly_category_name">{categories.categoryname}</p>
          <button onClick={() => DeleteCategory(categories._id)}>Delete</button>
        </div>
      ))}
    </span>
  );
}

export default DisplayCategory;
