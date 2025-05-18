import React from "react";
import "./header.css";
import { assets } from "../../assets/assets";
import { Link, Links } from "react-router-dom";
import { useHotel } from "../../context/HotelContext";

const Header = () => {
  const { isLoggedIn, logout, currentUser } = useHotel();

  return (
    <>
      <header>
        <div className="nav-group left">
          <a href="#hero" className="logo">
            <img src={assets.logo} />
          </a>
          {isLoggedIn &&
            (currentUser.isStaff ? (
              <Link to={"/dashboard"} className="nav-link">
                Black Sun Dashboard
              </Link>
            ) : (
              <a className="nav-link">{`Hello ${currentUser.fullname}`}</a>
            ))}
        </div>

        <div className="nav-group center">
          <a href="#history" className="nav-link">
            History
          </a>
          <a href="#rooms" className="nav-link">
            Rooms
          </a>
          <a href="#services" className="nav-link">
            Services
          </a>
        </div>

        <div className="nav-group right">
          {isLoggedIn && (
            <>
              <Link className="nav-link" to={"/profile"}>
                Profile
              </Link>
              <Link className="nav-link" to={"/booking-history"}>
                My Bookings
              </Link>
              <Link className="nav-link" onClick={() => logout()}>
                Logout
              </Link>
            </>
          )}
          {!isLoggedIn && (
            <Link className="nav-link" to={"/login"}>
              Login
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
