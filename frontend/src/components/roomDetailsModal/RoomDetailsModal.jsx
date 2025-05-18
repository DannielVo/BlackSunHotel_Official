import React from "react";
import "./roomDetailsModal.css";

const RoomDetailsModal = ({ isOpen, onClose, roomItem }) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="room-details-popup" onClick={handleOverlayClick}>
        <div className="popup-content" onClick={handleModalClick}>
          <span className="close-popup" onClick={onClose}>
            &times;
          </span>
          <div className="popup-grid">
            <div className="popup-info">
              <h2 id="popup-room-title">{roomItem.title}</h2>
              <p id="popup-room-description">{roomItem.description}</p>

              <div className="popup-features">
                <h3>Room Features</h3>
                <ul id="popup-features-list">
                  {roomItem.features.map((featItem, index) => (
                    <li key={`room-featItem ${index}`}>{featItem.detail}</li>
                  ))}
                </ul>
              </div>

              <div className="popup-amenities">
                <h3>Amenities</h3>
                <ul id="popup-amenities-list">
                  {roomItem.amenities.map((amenItem, index) => (
                    <li key={`room-amenItem ${index}`}>{amenItem}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="popup-image">
              <img id="popup-room-img" src={roomItem.img} alt="Room Image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetailsModal;
