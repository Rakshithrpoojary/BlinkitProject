import React, { useState } from "react";
import "../styles/UploadProductForm.css";
import { MdCloudUpload } from "react-icons/md";
import { useSelector } from "react-redux";
import { useProvider } from "../Store/Store";
import { useSearchParams } from "react-router-dom";

function UploadProductForm() {
  const [searchParams] = useSearchParams();
  const productid = searchParams.get("product");
  const Categorydata = useSelector((selector) => selector.category.category);
  const EditData = Categorydata.flatMap((catogory) =>
    catogory.SubcatogaryArray.flatMap((subcat) => subcat.Products)
  );
  const FindProduct = EditData.find((products) => products._id === productid);
  const [formdata, setFormdata] = useState(
    FindProduct || {
      productname: "",
      productdescription: "",
      keyfeatures: "",
      productimage: null,
      selectcateogary: "",
      selectsubcateogary: "",
      productunit: "",
      productstock: "",
      productprice: "",
      productdiscount: "",
      productsubimages: [],
    }
  );
  const { UploadProduct } = useProvider();
  const subCategorydata = Categorydata.find(
    (cateogary) => cateogary._id === formdata.selectcateogary
  );
  const OnchangeHandler = (e) => {
    const { value, name, files } = e.target;
    setFormdata((prevData) => {
      let updatedData = {
        ...prevData,
        [name]: files
          ? name === "productimage"
            ? files[0]
            : Array.from(files)
          : value,
      };
      if (name === "selectcateogary") {
        updatedData.selectsubcateogary = "";
      }
      return updatedData;
    });
  };
  const SubmitHandler = async (e) => {
    e.preventDefault();
    await UploadProduct(formdata, productid, setFormdata);
  };
  console.log(formdata);
  return (
    <form
      onSubmit={SubmitHandler}
      encType="multipart/form-data"
      className="upload-product-form-container"
    >
      <label htmlFor="productname">Name</label>
      <input
        value={formdata.productname}
        onChange={OnchangeHandler}
        type="text"
        placeholder="Enter Product Name"
        name="productname"
        id="productname"
      />
      <label htmlFor="productdescription">Description</label>
      <textarea
        value={formdata.productdescription}
        onChange={OnchangeHandler}
        rows={4}
        type="text"
        placeholder="Enter Product Descriptin"
        name="productdescription"
        id="productdescription"
      />
      <label htmlFor="productdescription">Key Features</label>
      <textarea
        value={formdata.keyfeatures}
        onChange={OnchangeHandler}
        rows={4}
        type="text"
        placeholder="Enter Key features"
        name="keyfeatures"
        id="productdescription"
      />
      <label>Banner Image</label>
      <label id="imagelabel" htmlFor="productimage">
        {formdata?.productimage instanceof File && (
          <img
            id="banner-img"
            src={URL.createObjectURL(formdata?.productimage)}
            alt="Product"
          />
        )}
        <p>
          <MdCloudUpload />
        </p>
        {formdata.productimage ? (
          <h5>{formdata.productimage.name}</h5>
        ) : (
          <h5>Upload Image</h5>
        )}
        <input
          onChange={OnchangeHandler}
          type="file"
          name="productimage"
          id="productimage"
        />
      </label>
      <label htmlFor="product-sub-images">Product Images</label>
      <div id="product-sub-images">
        <span className="uploaded-multiple-images">
          {formdata?.productsubimages?.length > 0 &&
            formdata.productsubimages.map((image, index) => (
              <img src={URL.createObjectURL(image)} alt="productsubimages" />
            ))}
        </span>

        <label>
          Upload
          <input
            multiple
            type="file"
            name="productsubimages"
            onChange={OnchangeHandler}
          />
        </label>
      </div>
      <label htmlFor="selectcateogary">Select Cateogary</label>
      <select
        value={formdata.selectcateogary}
        onChange={OnchangeHandler}
        id="selectcateogary"
        name="selectcateogary"
      >
        <option>Select Categogary</option>
        {Categorydata.map((cateogary) => (
          <option key={cateogary._id} value={cateogary._id}>
            {cateogary.categoryname}
          </option>
        ))}
      </select>
      <label htmlFor="selectsubcateogary">Select Sub Cateogary</label>
      <select
        value={formdata.selectsubcateogary}
        onChange={OnchangeHandler}
        id="selectsubcateogary"
        name="selectsubcateogary"
      >
        <option value="">Select Sub Categogary</option>
        {subCategorydata?.SubcatogaryArray?.map((subcat) => (
          <option key={subcat._id} value={subcat._id}>
            {subcat.subcatogaryname}
          </option>
        ))}
      </select>
      <label htmlFor="productunit">Unit</label>
      <input
        value={formdata.productunit}
        onChange={OnchangeHandler}
        type="number"
        placeholder="Enter Product Unit"
        name="productunit"
        id="productunit"
      />
      <label htmlFor="productstock">Number of Stock</label>
      <input
        value={formdata.productstock}
        onChange={OnchangeHandler}
        type="number"
        placeholder="Enter Product Stock"
        name="productstock"
        id="productstock"
      />
      <label htmlFor="productprice">Price</label>
      <input
        value={formdata.productprice}
        onChange={OnchangeHandler}
        type="number"
        placeholder="Enter Product Price"
        name="productprice"
        id="productprice"
      />
      <label htmlFor="productdiscount">Discount</label>
      <input
        value={formdata.productdiscount}
        onChange={OnchangeHandler}
        type="number"
        placeholder="Enter Product Discount"
        name="productdiscount"
        id="productdiscount"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UploadProductForm;
