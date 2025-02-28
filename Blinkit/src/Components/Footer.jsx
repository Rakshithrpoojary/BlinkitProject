import React from "react";
import "../styles/Footer.css";
import { MdFacebook } from "react-icons/md";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="footer-container">
        <p>@All Rights Reserved 2024</p>
        <div>
          <Link to="https://www.linkedin.com/in/rakshith-poojary-41b91020b/">
            <MdFacebook />
          </Link>
          <Link to="https://www.instagram.com/rakshith_986?utm_source=qr&igsh=MTlidGtrcGp4NXQwaA==">
            <FaInstagram />
          </Link>
          <Link to="https://www.linkedin.com/in/rakshith-poojary-41b91020b/">
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Footer;
