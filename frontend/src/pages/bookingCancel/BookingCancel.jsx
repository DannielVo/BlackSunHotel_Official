import React, { useEffect, useState } from "react";
import "./bookingCancel.css";
import { BOOKING_CANCEL } from "../../assets/assets";
import { Link } from "react-router-dom";

const BookingCancel = () => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const togglePolicy = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const renderItems = (items) =>
    items.map((item, index) => {
      if (typeof item === "string") {
        return <li key={index}>{item}</li>;
      } else if (typeof item === "object" && item.items) {
        return (
          <li key={index}>
            {item.name}
            <ul className="bookCancel-sublist">{renderItems(item.items)}</ul>
          </li>
        );
      }
      return null;
    });

  useEffect(() => {
    document.title = "Booking and Cancellation";
  }, []);

  return (
    <div className="bookingCancel-container">
      {" "}
      <div className="wrapper">
        <Link className="close-btn" to={"/"}>
          <i className="bx bx-x"></i>
        </Link>

        <h1>Booking & Cancellation</h1>

        <div className="thankyou">
          <p>
            Thank you for choosing to stay with Black Sun. This Booking &
            Cancellation Policy outlines some important guidelines to help
            ensure a smooth and enjoyable stay.
          </p>
        </div>

        {BOOKING_CANCEL.map((item, index) => (
          <div key={`bookingCancel ${index}`} className="bookCancel-section">
            <div
              className="bookCancel-category"
              onClick={() => togglePolicy(index)}
            >
              <span className="bookCancel-name">{item.name}</span>
              <i
                className={`bx bx-chevron-down arrow-btn ${
                  openIndexes.includes(index) ? "up" : ""
                }`}
              ></i>
            </div>
            <ul
              className={`bookCancel-items ${
                openIndexes.includes(index) ? "show" : ""
              }`}
            >
              {renderItems(item.items)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingCancel;
