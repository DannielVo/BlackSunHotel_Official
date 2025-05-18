import React from "react";
import "./hotelLocation.css";

const HotelLocation = () => {
  return (
    <>
      {" "}
      <section className="location">
        <div className="location-content">
          <div className="location-info">
            <h3>ADDRESS</h3>
            <p>
              123 Yersin St., Phuong Sai Ward, Nha Trang City, Khanh Hoa
              Province, Viet Nam
            </p>

            <h3>CONTACT</h3>
            <p>+84 28 1234 5678</p>
            <p>info@blacksunhotel.vn</p>
            <p>Check-in 13:30</p>
            <p>Check-out 12:00</p>

            <h3>DISTANCES</h3>
            <p>1.2 km from beachfront</p>
            <p>1.5 km from Nha Trang Station</p>
            <p>1.8 km from 19-8 Nha Trang Stadium</p>
          </div>

          <div className="location-map">
            {/* <!-- <img src="img/Location.jpg" alt="Map location of hotel" /> --> */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.98320023374!2d109.17850728306422!3d12.24941599938653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31705d7f224bc3e3%3A0xb4dd2cf442a27999!2zMTIzIFllcnNpbiwgUGjGsMahbmcgU8OgaSwgTmhhIFRyYW5nLCBLaMOhbmggSMOyYSA2NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1743869385661!5m2!1svi!2s"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HotelLocation;
