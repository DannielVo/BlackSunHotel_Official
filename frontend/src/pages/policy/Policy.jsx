import React, { useEffect, useState } from "react";
import "./policy.css";
import { POLICY } from "../../assets/assets";
import { Link } from "react-router-dom";

const Policy = () => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const togglePolicy = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    document.title = "Black Sun Hotel | Policy";
  }, []);

  return (
    <div className="policy-container">
      <div className="wrapper">
        <Link className="close-btn" to={"/"}>
          <i className="bx bx-x"></i>
        </Link>

        <h1>Privacy Policy</h1>

        <div className="thankyou">
          <p>
            Thank you for choosing to stay with Black Sun. This Privacy Policy
            explains how we collect, use, and protect your personal information
            when you interact with our website and related services. By using
            our services, you agree to the terms outlined in this policy.
          </p>
        </div>

        {POLICY.map((item, index) => (
          <div className="privacy-section" key={`policy ${index}`}>
            <div
              className="privacy-category"
              onClick={() => togglePolicy(index)}
            >
              <span className="privacy-name">{item.name}</span>
              <i
                className={`bx bx-chevron-down arrow-btn ${
                  openIndexes.includes(index) ? "up" : ""
                }`}
              ></i>
            </div>
            <ul
              className={`privacy-items ${
                openIndexes.includes(index) ? "show" : ""
              }`}
            >
              {item.items.map((desc, idx) => (
                <li key={`policy-desc ${idx}`}>
                  <p>{desc}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policy;
