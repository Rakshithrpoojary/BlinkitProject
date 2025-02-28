import React, { useRef, useState } from "react";
import "../styles/AddSubcateogary.css";
import { MdCloudUpload } from "react-icons/md";
import { useSelector } from "react-redux";
import { useProvider } from "../Store/Store";

function AddSubcateogary({ closeSubcatogary, id }) {
  console.log("id.catid,id.subid", id.catid, id.subid);
  const formRef = useRef();
  const Categorydata = useSelector((selector) => selector.category.category);
  console.log("Categorydata", Categorydata);
  const EditCategorydata = Categorydata?.find(
    (categories) => categories._id === id.catid
  )?.SubcatogaryArray?.find((subcat) => subcat._id === id.subid);
  console.log("EditCategorydata", EditCategorydata);

  const [subCatogary, setsubCatogary] = useState(
    EditCategorydata || {
      subcatogaryname: "",
      catogaryname: "",
      subcateogaryimage: "",
    }
  );
  const { AddSubcatogory } = useProvider();

  const CloseAddSubcatogary = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      closeSubcatogary();
    }
  };
  const HandleChange = (e) => {
    const { name, value, files } = e.target;
    setsubCatogary((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };
  const SubmitForm = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("subcatogaryname", subCatogary.subcatogaryname);
    formdata.append("catogaryname", subCatogary.catogaryname);
    formdata.append("subcateogaryimage", subCatogary.subcateogaryimage);
    formdata.append("categaryid", id.catid);
    formdata.append("subcategoryid", id.subid);
    const endpoint = id.subid ? "editsubcatogary" : "addsubcatogary";
    // const method = id.catid ? "PATCH" : "POST";
    console.log("ID", id);
    AddSubcatogory(formdata, endpoint);
  };
  return (
    <div onClick={CloseAddSubcatogary} className="subcateogary-overlay">
      <form onSubmit={SubmitForm} encType="multipart/form-data" ref={formRef}>
        <p className="heading">Add Subcateogary</p>
        <input
          value={subCatogary.subcatogaryname}
          onChange={HandleChange}
          name="subcatogaryname"
          id="entersubcateogaryname"
          type="text"
          placeholder="Enter Subcateogary name..."
        />

        <select
          value={subCatogary.catogaryname}
          onChange={HandleChange}
          name="catogaryname"
        >
          <option>Select cateogary</option>
          {Categorydata?.map((catogary) => (
            <option key={catogary._id}>{catogary.categoryname}</option>
          ))}
        </select>
        <label htmlFor="uploadsubcateogaryfile">
          <p>
            <MdCloudUpload />
          </p>

          {subCatogary.subcateogaryimage ? (
            <h4>{subCatogary.subcateogaryimage.name}</h4>
          ) : (
            <h4> Upload Image</h4>
          )}
        </label>
        <input
          // value={subCatogary.subcateogaryimage}
          onChange={HandleChange}
          name="subcateogaryimage"
          id="uploadsubcateogaryfile"
          type="file"
          placeholder="Enter subcateogaryname..."
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddSubcateogary;
