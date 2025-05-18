import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../assets/assets";

const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    // Tạo request body cho đăng nhập
    const dataRequest = {
      email: email,
      password: password,
      fullname: fullname,
      phone: "",
      isStaff: false,
      roleName: "customer",
    };

    try {
      const response = await axios.post(API_URL + "/auth/signup", dataRequest);

      alert("Successfully registered new user!");

      navigate("/login");
    } catch (err) {
      setError(
        "Something went wrong. Please check the data input and try again later!"
      );
      console.error(err);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        {/* <!-- Register --> */}
        <h1>Sign up</h1>

        {error && <div className="error-message">{error}</div>}

        {/* <!-- Username --> */}
        <div className="input-box">
          <input
            type="text"
            placeholder="Fullname"
            required
            onChange={(e) => setFullname(e.target.value)}
          />
          <i className="bx bxs-user"></i>
        </div>

        {/* <!-- Email --> */}
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <i className="bx bxs-envelope"></i>
        </div>

        {/* <!-- Password --> */}
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="bx bxs-lock-alt"></i>
        </div>

        {/* <!-- Button Sign up --> */}
        <button type="submit" className="btn" onClick={() => handleRegister()}>
          Sign up
        </button>

        {/* <!-- Login link --> */}
        <div className="login-link">
          <p>
            Already have an account?{" "}
            <a onClick={() => navigate("/login")}>Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
