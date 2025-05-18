import React from "react";
import { assets } from "../../assets/assets";
import "./headerSettingPage.css";
import { Link } from "react-router-dom";

const HeaderSettingPage = () => {
  return (
    <>
      {/* <!-- Hero --> */}
      <div className="setting-hero-image">
        <img src={assets.slide1} alt="The Black Sun Hotel" />
      </div>

      {/* <!-- Header --> */}
      <header className="setting-header">
        <div className="setting-nav-group left">
          <Link to={"/"} className="setting-logo">
            <img src={assets.logo} />
          </Link>
        </div>

        <div className="setting-nav-group right">
          <i className="bx bx-info-circle"></i>
          <span>Call us on +84 28 1234 5678</span>
        </div>
      </header>
    </>
  );
};

export default HeaderSettingPage;
