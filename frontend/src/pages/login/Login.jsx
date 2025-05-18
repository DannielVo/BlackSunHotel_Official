import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useHotel } from "../../context/HotelContext";
import axios from "axios";
import { API_URL } from "../../assets/assets";

const Login = () => {
  const { login } = useHotel();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Tạo request body cho đăng nhập
    const loginRequest = {
      email: email,
      password: password,
    };

    try {
      // Gửi yêu cầu đăng nhập đến API
      const response = await axios.post(API_URL + "/auth/login", loginRequest);

      login(response);

      navigate("/");
    } catch (err) {
      // Xử lý lỗi khi đăng nhập không thành công
      setError("Incorrect login information");
      console.error(err);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* <!-- Login --> */}
        <h1>Login</h1>

        {error && <div className="error-message">{error}</div>}

        {/* <!-- User name --> */}
        <div className="input-box">
          <input
            type="text"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <i className="bx bxs-user"></i>
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

        {/* <!-- Remember me --> */}
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>

        {/* <!-- Button submit --> */}
        <button type="submit" className="btn" onClick={handleLogin}>
          Login
        </button>

        {/* <!-- Register link --> */}
        <div className="register-link">
          <p>
            Don't have an account?{" "}
            <a onClick={() => navigate("/signup")}>Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
