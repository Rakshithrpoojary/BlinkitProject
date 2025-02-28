import React, { useRef, useState } from "react";
import "../styles/AddCategory.css";
import { MdCloudUpload } from "react-icons/md";
import { useProvider } from "../Store/Store";
function AddCategory({ closeCategory }) {
  const ref = useRef();
  const [Image, setImage] = useState({ category: "", categoryname: "" });
  const { UploadCategory } = useProvider();

  const CloseCategory = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      closeCategory();
    }
  };
  const HandleOnchange = (e) => {
    const { name, value, files } = e.target;
    setImage((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const SubmitCategory = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("category", Image.category);
    formdata.append("categoryname", Image.categoryname);
    UploadCategory(formdata);
  };
  return (
    <div onClick={CloseCategory} className="category-overlay">
      <form onSubmit={SubmitCategory} encType="multipart/form-data" ref={ref}>
        <p>Add Cateogary</p>
        <input
          name="category"
          onChange={HandleOnchange}
          id="fileUpload"
          type="file"
        />
        <label htmlFor="fileUpload">
          <p>
            <MdCloudUpload />
          </p>
          {Image.category ? (
            <h4>{Image.category.name}</h4>
          ) : (
            <h4> Upload Image</h4>
          )}
        </label>

        <input
          id="category_name"
          onChange={HandleOnchange}
          name="categoryname"
          type="text"
          placeholder="Enter category name..."
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddCategory;
