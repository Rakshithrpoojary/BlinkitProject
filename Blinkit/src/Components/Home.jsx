import React from "react";
import "../styles/Home.css";
import HomeCateogory from "../Components/HomeCateogory";
import HomeCategoryDetails from "./HomeCategoryDetails";
function Home() {
  return (
    <>
      <div className="hero-container">
        <img src="heroone.jpg" alt="Hero" />
        <div>
          <p>𝐏𝐚𝐧 𝐂𝐨𝐫𝐧𝐞𝐫</p>
          <button>Shop now</button>
        </div>
      </div>
      <HomeCateogory />
      <HomeCategoryDetails />
    </>
  );
}

export default Home;
