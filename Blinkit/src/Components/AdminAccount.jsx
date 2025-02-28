import React from "react";
import "../styles/Account.css";
import { Link } from "react-router-dom";
function AdminAccount() {
  return (
    <span className="links-container">
      <Link to={"/dashboard/category"} className="sub-links">
        Category
      </Link>
      <Link to={"/dashboard/subcategory"} className="sub-links">
        Sub Category
      </Link>
      <Link to={"/dashboard/uploadproduct"} className="sub-links">
        Upload Product
      </Link>
      <Link to={"/dashboard/displayproduct"} className="sub-links">
        Product
      </Link>
    </span>
  );
}

export default AdminAccount;
