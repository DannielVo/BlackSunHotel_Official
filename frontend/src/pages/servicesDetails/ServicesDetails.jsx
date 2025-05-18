import React, { useEffect, useState } from "react";
import "./servicesDetails.css";
import { SERVICES_DETAILS } from "../../assets/assets";
import { Link } from "react-router-dom";

const ServicesDetails = () => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleService = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    document.title = "Black Sun Hotel | Services";
  }, []);

  return (
    <div className="service-wrapper">
      {" "}
      <Link class="close-btn" to={"/"}>
        <i class="bx bx-x"></i>
      </Link>
      <h1>Services, infrastructures, and amenities</h1>
      {SERVICES_DETAILS.map((service, index) => (
        <div key={index} className="service-section">
          <div
            className="service-category"
            onClick={() => toggleService(index)}
          >
            <div className="left-part">
              <i className={service.icon}></i>
              <span className="category-name">{service.title}</span>
            </div>
            <i
              className={`bx bx-chevron-down arrow-btn ${
                openIndexes.includes(index) ? "up" : ""
              }`}
            ></i>
          </div>
          <ul
            className={`service-items ${
              openIndexes.includes(index) ? "show" : ""
            }`}
          >
            {service.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ServicesDetails;
