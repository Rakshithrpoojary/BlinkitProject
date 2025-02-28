import React from "react";
import "../App.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/SkeletonLoading.css";
function SkeletonLoading() {
  return (
    <div className="full">
      <div
        className="navbar-skeleton"
        style={{ display: "flex", gap: "2rem", alignItems: "center" }}
      >
        <Skeleton
          baseColor="#f5f5f5"
          highlightColor="#dedede"
          borderRadius={10}
          height={70}
          width={1000}
        />
        <Skeleton borderRadius={10} height={50} width={200} />
        <Skeleton borderRadius={10} height={50} width={100} />
      </div>

      <div className="home-container">
        <Skeleton height={300} />
        <div className="cards">
          {Array(10)
            .fill(0)
            .map((item, index) => (
              <div key={index} className="card">
                <Skeleton height={300} />
                <Skeleton
                  count={5}
                  height={20}
                  style={{ margin: "0.5rem 0" }}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoading;
