import React, { useState, useRef } from "react";
import "../styles/ProductImageDetails.css";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
function ProductImageDetails({ Products }) {
  const [changeImage, setchangeImage] = useState(0);
  const ref = useRef();
  const Scroll = (direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction == "right" ? 200 : -200,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="product-image-details-container">
      <div className="product-main-img">
        <img
          src={Products?.productsubimage[changeImage]}
          alt="productimage"
          id="productimages"
        />
      </div>
      <div className="bubbles">
        {Products?.productsubimage?.map((img, index) => (
          <p
            style={{
              backgroundColor: changeImage === index ? "#CBD5E1" : "#E2E8F0",
            }}
            key={index}
            id="child-bubbles"
          ></p>
        ))}
      </div>
      <div className="product-img-container">
        <p onClick={() => Scroll("right")} id="scroll-product-right">
          <MdOutlineKeyboardArrowRight />
        </p>
        <span ref={ref} className="product-sub-img">
          {Products?.productsubimage?.map((img, index) => (
            <>
              <img
                key={index}
                onClick={() => setchangeImage(index)}
                id="product-imgs"
                src={img}
              />
            </>
          ))}
        </span>
        <p onClick={() => Scroll("left")} id="scroll-product-left">
          <MdOutlineKeyboardArrowLeft />
        </p>
      </div>
      <div className="product-text-container">
        <span>
          <h5>Description</h5>
          <p>{Products?.productdescription}</p>
        </span>
        <span>
          <h5>Unit</h5>
          <p>{Products?.productunit}</p>
        </span>
        <span>
          <h5>Key Features</h5>
          <p>{Products?.keyfeatures}</p>
        </span>
        <span>
          <h5>Disclaimer</h5>
          <p>{Products?.productdescription}</p>
        </span>
      </div>
    </div>
  );
}

export default ProductImageDetails;
