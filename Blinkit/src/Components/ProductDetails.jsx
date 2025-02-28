import React from "react";
import "../styles/ProductDetails.css";
import ProductImageDetails from "./ProductImageDetails";
import ProductDescriptionDetails from "./ProductDescriptionDetails";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
function ProductDetails() {
  const [searchparams] = useSearchParams();
  const Categorydata = useSelector((selector) => selector.category.category);
  const productid = searchparams.get("product-id");

  const Product = Categorydata.flatMap((cat) =>
    cat.SubcatogaryArray.flatMap((subcat) => subcat.Products)
  );
  const FindProduct = Product.find((product) => product._id === productid);
  return (
    <div className="product-details-container">
      <ProductImageDetails Products={FindProduct} />
      <ProductDescriptionDetails Products={FindProduct} />
    </div>
  );
}

export default ProductDetails;
