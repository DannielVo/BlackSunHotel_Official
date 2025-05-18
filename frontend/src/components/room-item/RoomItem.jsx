import React, { useEffect, useState } from "react";
import "./roomItem.css";
import { assets } from "../../assets/assets";
import RoomDetailsModal from "../roomDetailsModal/RoomDetailsModal";

const RoomItem = ({ roomItem }) => {
  const [isRoomDetailsOpen, setIsRoomDetailsOpen] = useState(false);
  const [roomItemDetails, setRoomItemDetails] = useState(null);

  const openRoomDetailsModal = (roomItem) => {
    setIsRoomDetailsOpen(true);
    setRoomItemDetails(roomItem);
  };
  const closeRoomDetailsModal = () => {
    setIsRoomDetailsOpen(false);
    setRoomItemDetails(null);
  };

  return (
    <>
      <div className="room-card">
        <div className="room-image">
          <img src={roomItem.img} alt={roomItem.title} />
        </div>
        <div className="room-content">
          <h3 className="card-title">{roomItem.title}</h3>
          <p className="room-type">{roomItem.type}</p>
          <p className="room-description">{roomItem.description}</p>
          <button
            className="book-now-btn"
            onClick={() => openRoomDetailsModal(roomItem)}
          >
            More info
          </button>
        </div>
      </div>

      <RoomDetailsModal
        isOpen={isRoomDetailsOpen}
        onClose={closeRoomDetailsModal}
        roomItem={roomItemDetails}
      />
    </>
  );
};

export default RoomItem;
