import React from "react";
import "../styles/DisplaySubCatogory.css";
import { useSelector } from "react-redux";
import { MdEdit, MdDelete } from "react-icons/md";
import { useProvider } from "../Store/Store";
function DisplaySubcatogory({ opensubcatogary }) {
  const Categorydata = useSelector((selector) => selector.category.category);
  const { DeleteSubCategory } = useProvider();
  return (
    <div className="display-subcatogory">
      <table className="table-full-container" border="1">
        <thead className="table-head">
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Catogory Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Categorydata?.map((catogories) =>
            catogories.SubcatogaryArray.map((subcatogory) => (
              <tr key={subcatogory._id}>
                <td>{subcatogory.subcatogaryname}</td>
                <td>
                  <img
                    src={subcatogory.subcateogaryimage}
                    alt="subcatogory"
                    id="subcat-image"
                  />
                </td>
                <td>{subcatogory.catogaryname}</td>
                <td>
                  <div className="edit-delete-subcat">
                    <p
                      onClick={() =>
                        opensubcatogary(catogories._id, subcatogory._id)
                      }
                      id="edit-subcatogory"
                    >
                      <MdEdit />
                    </p>
                    <p
                      onClick={() =>
                        DeleteSubCategory(catogories._id, subcatogory._id)
                      }
                      id="delete-subcatogory"
                    >
                      <MdDelete />
                    </p>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DisplaySubcatogory;
