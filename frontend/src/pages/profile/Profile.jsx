import React, { useState } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { useHotel } from "../../context/HotelContext";
import axios from "axios";
import { API_URL } from "../../assets/assets";

const Profile = () => {
  const { currentUser } = useHotel();

  const [email, setEmail] = useState(currentUser.email);
  const [fullname, setFullname] = useState(currentUser.fullname);
  const [phone, setPhone] = useState(currentUser.phone);

  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!fullname) {
      alert("Fullname cannot be empty!");
      return;
    }

    if (!email && !phone) {
      alert(
        "Email and phone cannot be both empty! You have to fill in email or phone."
      );
      return;
    }

    // Tạo request body cho đăng nhập
    const dataRequest = {
      email: email,
      fullname: fullname,
      phone: phone,
      isStaff: currentUser.isStaff,
      roleName: currentUser.roleName,
    };

    try {
      const response = await axios.put(
        API_URL + "/users/" + currentUser.userId,
        dataRequest
      );

      alert("Successfully updated user!");
    } catch (err) {
      setError(
        "Something went wrong. Please check the data input and try again later!"
      );
      console.error(err);
    }
  };

  return (
    <div className="user-profile-container">
      <div className="user-avatar">
        <i className="bx bx-user"></i>
      </div>
      <div className="user-info">
        <h2>Your Information</h2>
        <form>
          <div className="profile-form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={fullname}
              placeholder="Enter your full name"
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="profile-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="profile-form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              placeholder="Enter your phone number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="profile-btn">
            <button
              type="reset"
              className="cancel-btn"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button type="submit" className="update-btn" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
