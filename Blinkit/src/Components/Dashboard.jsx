import React from "react";
import Account from "./Account";
import "../styles/Dashboard.css";
import { Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

function Dashboard() {
  console.log("dashboard");
  const [openmenu, closemenu] = useState(false);
  return (
    <div className="Dashboard-container">
      <p onClick={() => closemenu(!openmenu)} id="hmburg">
        <GiHamburgerMenu />
      </p>
      {window.innerWidth <= 1200 ? (
        openmenu && <Account classname="dashboard-account-container" />
      ) : (
        <Account classname="dashboard-account-container" />
      )}
      <Outlet />
    </div>
  );
}

export default Dashboard;
