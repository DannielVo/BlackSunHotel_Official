import React, { useEffect, useRef, useState } from "react";
import CheckAvailabilityBar from "../../components/checkAvailabilityBar/CheckAvailabilityBar";
import "./checkAvailability.css";
import { API_URL, assets, EXTRA_BED, ROOM_LIST } from "../../assets/assets";
import { useHotel } from "../../context/HotelContext";
import RoomDetailsModal from "../../components/roomDetailsModal/RoomDetailsModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckAvailability = () => {
  const {
    totalPrice,
    updateTotalPrice,
    roomCounts,
    setRoomCounts,
    extraBedCount,
    setExtraBedCount,
    processRooms,
    checkResponseData,
    setCheckResponseData,
    result,
    setResult,
  } = useHotel();
  const navigate = useNavigate();

  const [isRoomDetailsOpen, setIsRoomDetailsOpen] = useState(false);
  const [roomItemDetails, setRoomItemDetails] = useState(null);

  const totalRoomsSelected = Object.values(roomCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  const openRoomDetailsModal = (roomItem) => {
    setIsRoomDetailsOpen(true);
    setRoomItemDetails(roomItem);
  };
  const closeRoomDetailsModal = () => {
    setIsRoomDetailsOpen(false);
    setRoomItemDetails(null);
  };

  const handleIncreaseRoom = (roomType) => {
    const max = result.maxAvailable.find(
      (item) => item.roomTypeName.toLowerCase() === roomType.toLowerCase()
    );

    if (!max || roomCounts[roomType] + 1 > max.availableCount) {
      return;
    }

    setRoomCounts((prev) => ({
      ...prev,
      [roomType]: prev[roomType] + 1,
    }));
  };

  const handleDecreaseRoom = (roomType) => {
    setRoomCounts((prev) => ({
      ...prev,
      [roomType]: Math.max(prev[roomType] - 1, 0),
    }));
  };

  const handleIncreaseExtraBed = () => {
    setExtraBedCount((prev) => Math.min(1, prev + 1));
  };

  const handleDecreaseExtraBed = () => {
    setExtraBedCount((prev) => Math.max(prev - 1, 0));
  };

  const handleCheckBooking = async (
    adults,
    children,
    rooms,
    checkIn,
    checkOut
  ) => {
    try {
      const numberOfPeople = adults + children;

      const response = await axios.post(
        API_URL + "/bookings/checkAvailability",
        {
          numberOfRooms: rooms,
          numberOfPeople: numberOfPeople,
          checkInDate: checkIn,
          checkOutDate: checkOut,
        }
      );
      if (response.data.length === 0) {
        alert("No available room");
        return;
      }
      alert("List available room is updated");

      setCheckResponseData(response.data);
      handleCheckReponse(response.data);
    } catch (error) {
      console.error("Check failed:", error);
      alert("No available room");
    }
  };

  useEffect(() => {
    updateTotalPrice();
  }, [roomCounts, extraBedCount]);

  useEffect(() => {
    if (totalRoomsSelected === 0) {
      setExtraBedCount(0);
    }
  }, [totalRoomsSelected]);

  const handleCheckReponse = (response = null) => {
    if (response !== null || checkResponseData !== null) {
      const tmpResult = processRooms(response || checkResponseData);
      console.log(tmpResult);
      setResult(tmpResult);

      // tmpResult.initResult.forEach((item) => {
      //   const key = item.roomTypeName.toLowerCase();
      //   setRoomCounts((prev) => ({
      //     ...prev,
      //     [key]: item.count,
      //   }));
      // });
      const newCounts = {};
      tmpResult.initResult.forEach((item) => {
        const key = item.roomTypeName.toLowerCase();
        newCounts[key] = item.count;
      });

      setRoomCounts(newCounts);
    }
  };

  useEffect(() => handleCheckReponse(), []);

  return (
    <>
      <CheckAvailabilityBar handleCheckAvailability={handleCheckBooking} />

      <section className="setting-room-list-container">
        <div className="setting-room-options">
          {/* <!-- Option --> */}
          <div className="setting-room-option">
            <h3 className="setting-option-title">Option</h3>

            <div className="setting-room-grid">
              {ROOM_LIST.length === 0
                ? ""
                : ROOM_LIST.map((roomItem, index) => (
                    <div
                      className="setting-room-card"
                      key={`setting-roomItem ${index}`}
                    >
                      <div className="setting-room-img">
                        <img src={roomItem.img} alt={roomItem.title} />
                      </div>
                      <div className="setting-room-details">
                        <h4 className="setting-room-title">{roomItem.title}</h4>
                        <p className="setting-room-type">
                          {roomItem.features[0].detail +
                            ", " +
                            roomItem.features[1].detail +
                            ", " +
                            roomItem.features[2].detail}
                        </p>
                        <p className="setting-room-description">
                          {roomItem.shortDescription}
                        </p>

                        {roomItem.amenities.length === 0 ? (
                          ""
                        ) : (
                          <div className="setting-room-service">
                            {roomItem.amenities
                              .slice(0, 3) //get only first 3 furniture
                              .map((amenItem, idx) => (
                                <div
                                  className="setting-service-item"
                                  key={`setting-amenItem ${idx}`}
                                >
                                  • {amenItem}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>

                      <div className="setting-room-quantity">
                        <div className="setting-quantity-control">
                          {/* cập nhật totalPrice khi tăng giảm số lượng phòng */}
                          <button
                            className="minus"
                            data-type="room"
                            onClick={() => handleDecreaseRoom(roomItem.typeId)}
                          >
                            -
                          </button>
                          {/* hiển thị roomItemCount đúng với roomItem typeId (economy, premium, deluxe) */}
                          <span className="setting-card-room-count">
                            {roomCounts[roomItem.typeId] || 0}
                          </span>
                          <button
                            className="plus"
                            data-type="room"
                            onClick={() => handleIncreaseRoom(roomItem.typeId)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="setting-room-price">
                        <div className="setting-price">
                          {roomItem.price.toLocaleString("vi-VN")} VND
                        </div>
                      </div>

                      <div className="setting-details-area">
                        <i className="bx bx-info-circle"></i>
                        <button
                          className="setting-see-details-btn"
                          onClick={() => openRoomDetailsModal(roomItem)}
                        >
                          See details
                          {/* open modal here */}
                        </button>
                      </div>
                    </div>
                  ))}

              {/* <!-- Extra Bed --> */}
              <div className="setting-room-card extra-item">
                <div className="setting-room-img">
                  <img src={EXTRA_BED.img} alt={EXTRA_BED.title} />
                </div>
                <div className="setting-room-details">
                  <h4 className="setting-room-title">{EXTRA_BED.title}</h4>
                  <p className="setting-room-type">{EXTRA_BED.type}</p>
                </div>

                <div className="setting-room-quantity">
                  <div className="setting-quantity-control">
                    <button
                      className="minus"
                      data-type="extra-bed"
                      onClick={handleDecreaseExtraBed}
                      disabled={totalRoomsSelected === 0}
                    >
                      -
                    </button>
                    <span className="setting-extra-bed-count">
                      {extraBedCount}
                    </span>
                    <button
                      className="plus"
                      data-type="extra-bed"
                      onClick={handleIncreaseExtraBed}
                      disabled={totalRoomsSelected === 0}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="setting-room-price">
                  <div className="setting-price">
                    {EXTRA_BED.price.toLocaleString("vi-VN")} VND
                  </div>
                </div>
              </div>
            </div>

            <div className="setting-option-total">
              <div className="setting-total-label">Total cost:</div>
              {/* hiển thị totalPrice ra đây */}
              <div className="setting-total-price">
                {totalPrice.toLocaleString("vi-VN")} VND
              </div>
              <button
                className="setting-select-btn"
                onClick={() => navigate("/confirm")}
              >
                Select
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Room Details Popup --> */}
        <RoomDetailsModal
          isOpen={isRoomDetailsOpen}
          onClose={closeRoomDetailsModal}
          roomItem={roomItemDetails}
        />
      </section>
    </>
  );
};

export default CheckAvailability;
