import React from "react";
import "./hotelServices.css";
import { SERVICES_LIST } from "../../../assets/assets";
import { Link } from "react-router-dom";

const HotelServices = () => {
  return (
    <>
      {" "}
      <section id="services" className="services-section white-bg">
        <div className="services-container">
          <h2>Services and Facilities</h2>
          <p className="services-desc">
            Discover the wide range of services and facilities that ensure a
            most pleasant and comfortable stay at our hotel.
          </p>

          <div className="services-list">
            {SERVICES_LIST.length === 0
              ? ""
              : SERVICES_LIST.map((item, index) => (
                  <div className="service-item" key={`service ${index}`}>
                    <i className={item.icon}></i>
                    <span>{item.serviceName}</span>
                  </div>
                ))}

            <div className="learn-more">
              <Link to={"/services-details"}>Learn more</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HotelServices;
