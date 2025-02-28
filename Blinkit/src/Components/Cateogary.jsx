import React, { useState } from "react";
import ProtectedRoutes from "../Components/ProtectedRoutes";
import "../styles/Category.css";
import AddCategory from "./AddCategory";
import DisplayCategory from "./DisplayCategory";
function Cateogary() {
  const [openAddcategory, setopenAddcategory] = useState(false);
  const openCategory = () => setopenAddcategory(true);
  const closeCategory = () => setopenAddcategory(false);
  return (
    <div className="category-container">
      <span className="category-header">
        <p>Category</p>
        <button onClick={openCategory}>Add Category</button>
      </span>
      <DisplayCategory />
      {openAddcategory && <AddCategory closeCategory={closeCategory} />}
    </div>
  );
}
const ProtectedCatogory = ProtectedRoutes(Cateogary);
export default ProtectedCatogory;
