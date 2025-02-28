import React from "react";
import { CiSearch } from "react-icons/ci";
import "../styles/SearchProduct.css";
import { useProvider } from "../Store/Store";
function SearchProduct() {
  const { SearchResults } = useProvider();
  return (
    <span className="search-product">
      <p>
        <CiSearch />
      </p>
      <input
        onChange={(e) => SearchResults(e.target.value)}
        type="text"
        placeholder="Search Products..."
      />
    </span>
  );
}

export default SearchProduct;
