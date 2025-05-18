import React, { useState } from "react";
import "./confirmAndPayment.css";
import { API_URL, assets, EXTRA_BED, ROOM_LIST } from "../../assets/assets";
import { useHotel } from "../../context/HotelContext";
import axios from "axios";

const ConfirmAndPayment = () => {
  const {
    totalPrice,
    roomCounts,
    extraBedCount,
    checkinDate,
    checkoutDate,
    adultsCount,
    childrenCount,
    result,
    currentUser,
  } = useHotel();

  const [activeTab, setActiveTab] = useState("ewallet");
  const [qrActive, setQrActive] = useState("momo");

  const [tmpFullName, setTmpFullName] = useState("");
  const [tmpEmail, setTmpEmail] = useState("");
  const [tmpPhone, setTmpPhone] = useState("");
  const [tmpNotes, setTmpNotes] = useState("");

  const totalRoomsSelected = Object.values(roomCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleQrCodeClick = (qrId) => {
    setQrActive(qrId);
  };

  const getSelectedRoomIds = (roomCounts, maxAvailable) => {
    const selectedRoomIds = [];

    Object.entries(roomCounts).forEach(([type, count]) => {
      const match = maxAvailable.find(
        (item) => item.roomTypeName.toLowerCase() === type.toLowerCase()
      );

      if (match && match.roomIds && match.roomIds.length > 0) {
        selectedRoomIds.push(...match.roomIds.slice(0, count));
      }
    });

    return selectedRoomIds;
  };

  const createBooking = async () => {
    try {
      if (!tmpFullName || !tmpPhone) {
        alert(
          "Please fill in at least fullname and phone number to move forward!"
        );
        return;
      }

      const roomIds = getSelectedRoomIds(roomCounts, result.maxAvailable);

      const dto = {
        userId: currentUser !== null ? currentUser.userId : null,
        fullname:
          tmpFullName !== ""
            ? tmpFullName
            : currentUser !== null
            ? currentUser.fullname
            : "",
        email:
          tmpEmail !== ""
            ? tmpEmail
            : currentUser !== null
            ? currentUser.email
            : "",
        phone:
          tmpPhone !== ""
            ? tmpPhone
            : currentUser !== null
            ? currentUser.phone
            : "",
        checkInDate: checkinDate,
        checkOutDate: checkoutDate,
        totalPrice: totalPrice,
        paymentStatus: "Paid",
        notes: tmpNotes + (extraBedCount > 0 ? "extrabed" : ""),
        roomIds: roomIds,
      };

      const response = await axios.post(API_URL + "/bookings", dto);
      console.log("Đặt phòng thành công:", response.data);
      alert("Đặt phòng thành công");
    } catch (error) {
      console.error("Lỗi khi đặt phòng:", error);
      alert("Lỗi khi đặt phòng");
    }
  };

  return (
    <>
      {/* <!-- Titlebar --> */}
      <section className="confirm-title-bar">
        Confirm Booking and Payment
      </section>

      {/* <!-- Your Option --> */}
      <section className="confirm-confirmOption-wrapper">
        <div className="confirm-room-options">
          <div className="confirm-room-option">
            <h3 className="confirm-option-title">Booking Details</h3>

            <div className="confirm-room-grid">
              {ROOM_LIST.length === 0
                ? ""
                : ROOM_LIST.map((roomItem, index) => (
                    <div
                      className="confirm-room-card"
                      key={`confirm-roomItem ${index}`}
                    >
                      <div className="confirm-room-img">
                        <img src={roomItem.img} alt={roomItem.title} />
                      </div>
                      <div className="confirm-room-details">
                        <h4 className="confirm-room-title">{roomItem.title}</h4>
                        <p className="confirm-room-type">
                          {roomItem.features[0].detail +
                            ", " +
                            roomItem.features[1].detail +
                            ", " +
                            roomItem.features[2].detail}
                        </p>
                        <p className="confirm-room-description">
                          {roomItem.shortDescription}
                        </p>

                        {roomItem.amenities.length === 0 ? (
                          ""
                        ) : (
                          <div className="confirm-room-service">
                            {roomItem.amenities
                              .slice(0, 3) //get only first 3 furniture
                              .map((amenItem, idx) => (
                                <div
                                  className="confirm-service-item"
                                  key={`confirm-amenItem ${idx}`}
                                >
                                  • {amenItem}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>

                      <div className="confirm-room-quantity">
                        <div className="confirm-quantity-control">
                          <span className="confirm-card-room-count">
                            {roomCounts[roomItem.typeId] || 0}
                          </span>
                        </div>
                      </div>

                      <div className="confirm-room-price">
                        <div className="confirm-price">
                          {roomItem.price.toLocaleString("vi-VN")} VND
                        </div>
                      </div>
                    </div>
                  ))}

              {/* <!-- Extra Bed --> */}
              <div className="confirm-room-card extra-item">
                <div className="confirm-room-img">
                  <img src={EXTRA_BED.img} alt={EXTRA_BED.title} />
                </div>
                <div className="confirm-room-details">
                  <h4 className="confirm-room-title">{EXTRA_BED.title}</h4>
                  <p className="confirm-room-type">{EXTRA_BED.type}</p>
                </div>

                <div className="confirm-room-quantity">
                  <div className="confirm-quantity-control">
                    <span className="confirm-extra-bed-count">
                      {extraBedCount}
                    </span>
                  </div>
                </div>

                <div className="confirm-room-price">
                  <div className="confirm-price">
                    {EXTRA_BED.price.toLocaleString("vi-VN")} VND
                  </div>
                </div>
              </div>
            </div>

            <div className="confirm-option-total">
              <div className="confirm-option-details">
                <p>
                  {checkinDate +
                    " - " +
                    checkoutDate +
                    "; " +
                    adultsCount +
                    " adults; " +
                    childrenCount +
                    " children; " +
                    totalRoomsSelected +
                    " rooms"}
                </p>
              </div>
              <div className="confirm-option-price">
                <div className="confirm-total-label">Total cost:</div>
                <div className="confirm-total-price">
                  {totalPrice.toLocaleString("vi-VN")} VND
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Payment Details --> */}
      <section className="confirmPayment-wrapper">
        {/* <!-- Your Details and Payment Section --> */}
        <div className="confirm-form-section">
          {/* <!-- Left Column - Your Details --> */}
          <div className="confirm-form-column details-column">
            <h3>Your Details</h3>
            <form className="confirm-customer-form">
              <div
                className="confirm-form-group confirm-pair-group"
                data-pair="1"
              >
                <label for="confirm-full-name">Full Name</label>
                <input
                  type="text"
                  id="confirm-full-name"
                  required
                  value={tmpFullName}
                  onChange={(e) => setTmpFullName(e.target.value)}
                />
              </div>
              <div
                className="confirm-form-group confirm-pair-group"
                data-pair="2"
              >
                <label for="confirm-email">Email</label>
                <input
                  type="email"
                  id="confirm-email"
                  value={tmpEmail}
                  onChange={(e) => setTmpEmail(e.target.value)}
                />
              </div>
              <div
                className="confirm-form-group confirm-pair-group"
                data-pair="3"
              >
                <label for="confirm-phone">Phone Number</label>
                <input
                  type="tel"
                  id="confirm-phone"
                  required
                  value={tmpPhone}
                  onChange={(e) => setTmpPhone(e.target.value)}
                />
              </div>
              <div
                className="confirm-form-group confirm-pair-group"
                data-pair="4"
              >
                <label for="confirm-personal-request">
                  Any personal request?
                </label>
                <textarea
                  id="confirm-personal-request"
                  rows="4"
                  value={tmpNotes}
                  onChange={(e) => setTmpNotes(e.target.value)}
                ></textarea>
              </div>
            </form>
          </div>

          {/* <!-- Right Column - Payment --> */}
          <div className="confirm-form-column payment-column">
            <h3>Payment Method</h3>
            <div className="confirm-payment-methods">
              <div className="confirm-payment-tabs">
                <button
                  className={`confirm-payment-tab ${
                    activeTab === "ewallet" ? "active" : ""
                  }`}
                  data-tab="ewallet"
                  onClick={() => handleTabClick("ewallet")}
                >
                  E-Wallet
                </button>
                <button
                  className={`confirm-payment-tab ${
                    activeTab === "card" ? "active" : ""
                  }`}
                  data-tab="card"
                  onClick={() => handleTabClick("card")}
                >
                  Credit Card
                </button>
              </div>

              {/* <!-- E-Wallet Content --> */}
              <div
                className={`confirm-payment-content ${
                  activeTab === "ewallet" ? "active" : ""
                }`}
                id="ewallet"
                data-pair="1"
              >
                <div className="confirm-payment-options">
                  <div className="confirm-payment-option">
                    <input
                      type="radio"
                      id="momo"
                      name="ewallet"
                      checked={qrActive === "momo" ? true : false}
                      data-qr-src="img/Black Sun Hotel_QR_MOMO.png"
                      onClick={() => handleQrCodeClick("momo")}
                    />
                    <label for="momo">MOMO</label>
                  </div>
                  <div className="confirm-payment-option">
                    <input
                      type="radio"
                      id="bank"
                      name="ewallet"
                      checked={qrActive === "bank" ? true : false}
                      data-qr-src="img/Black Sun Hotel_QR_Bank.png"
                      onClick={() => handleQrCodeClick("bank")}
                    />
                    <label for="bank">Bank Transfer</label>
                  </div>
                </div>
                <div className="confirm-qr-code">
                  <p>Scan the QR code to complete payment</p>
                  <img
                    id="ewallet-qr-code"
                    src={qrActive === "momo" ? assets.qrMomo : assets.qrBanking}
                    alt="QR Code"
                  />
                </div>
              </div>

              {/* <!-- Credit Card Content --> */}
              <div
                className={`confirm-payment-content ${
                  activeTab === "card" ? "active" : ""
                }`}
                id="card"
              >
                <div className="confirm-visa-mastercard">
                  <img src={assets.visaMasterCard} alt="Visa Mastercard" />
                </div>
                <div
                  className="confirm-form-group confirm-pair-group"
                  data-pair="2"
                >
                  <label for="card-name">Name on Card</label>
                  <input
                    type="text"
                    id="card-name"
                    placeholder="Enter the name on the credit card"
                    required
                  />
                </div>
                <div
                  className="confirm-form-group confirm-pair-group"
                  data-pair="3"
                >
                  <label for="card-number">Card Number</label>
                  <input
                    type="text"
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div
                  className="confirm-form-row confirm-pair-group"
                  data-pair="4"
                >
                  <div className="confirm-form-group">
                    <label for="expiry">Expiry Date</label>
                    <input
                      type="text"
                      id="expiry"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="confirm-form-group">
                    <label for="cvv">CVV</label>
                    <input type="text" id="cvv" placeholder="123" required />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Book Button --> */}
        <div className="confirm-book-button">
          <button
            className="confirm-btn-primary"
            onClick={() => createBooking()}
          >
            Book Now
          </button>
        </div>
      </section>
    </>
  );
};

export default ConfirmAndPayment;
