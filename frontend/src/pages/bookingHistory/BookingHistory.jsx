import React, { useEffect, useState } from "react";
import "./bookingHistory.css";
import { useHotel } from "../../context/HotelContext";
import { API_URL, EXTRA_BED, ROOM_LIST } from "../../assets/assets";
import axios from "axios";

const BookingHistory = () => {
  const { currentUser } = useHotel();

  const [bookingList, setBookingList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedReviewContent, setSelectedReviewContent] = useState("");

  const handleSelectChange = (event) => {
    const bookingId = event.target.value;
    if (bookingId !== "") {
      const bookingItem = bookingList.find(
        (b) => b.bookingId.toString() === bookingId
      );
      setSelectedBooking(bookingItem);

      const reviewItem = reviewList.find(
        (x) => x.bookingId.toString() === bookingId
      );
      setSelectedReview(reviewItem);
      setSelectedReviewContent(reviewItem ? reviewItem.reviewContent : "");
    } else {
      setSelectedBooking(null);
      setSelectedReview(null);
      setSelectedReviewContent("");
    }
  };

  const fetchData = async () => {
    if (currentUser.userId) {
      //get list of booking by userId
      const bookingRespone = await axios.get(
        API_URL + "/bookings/findByUser/" + currentUser.userId
      );
      const bookingData = bookingRespone.data;
      setBookingList(bookingData);

      //get list of review by userId
      const reviewRespone = await axios.get(
        API_URL + "/reviews/findByUser/" + currentUser.userId
      );
      const reviewData = reviewRespone.data;
      setReviewList(reviewData);
    }
  };

  const handleUpdateReview = async () => {
    const dataRequest = {
      userId: currentUser.userId,
      bookingId: selectedBooking.bookingId,
      reviewContent: selectedReviewContent,
      rating: 5,
    };

    if (selectedReview) {
      //update new review
      try {
        const response = await axios.put(
          API_URL + "/reviews/" + selectedReview.reviewId,
          dataRequest
        );

        alert("Successfully updated user!");
      } catch (err) {
        setError("Something went wrong. Please try again later!");
        console.error(err);
      }
    } else {
      //add new review
      try {
        const response = await axios.post(API_URL + "/reviews", dataRequest);

        alert("Successfully added review!");
      } catch (err) {
        alert("Something went wrong. Please try again later!");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* <!-- Titlebar --> */}
      <section className="bhistory-title-bar">Bookings History</section>

      {/* <!-- Your Bookings --> */}
      <section className="bhistory-wrapper">
        <div className="bhistory-room-options">
          <div className="bhistory-room-option">
            <div className="bhistory-option-title">
              {/* 03/04/2024 - 07/04/2024 */}

              <select id="myDropdown" onChange={handleSelectChange}>
                <option value="">
                  -- Please select previous booking date --
                </option>
                {bookingList.length > 0 &&
                  bookingList.map((bItem, index) => (
                    <option value={bItem.bookingId} key={`bItem ${index}`}>{`${
                      bItem.checkInDate.split("T")[0]
                    } to ${bItem.checkOutDate.split("T")[0]}`}</option>
                  ))}
              </select>
            </div>

            <div className="bhistory-room-grid">
              {ROOM_LIST.length === 0
                ? ""
                : ROOM_LIST.map((roomItem, index) => (
                    <div key={`bhistory-roomItem ${index}`}>
                      <div className="bhistory-room-card">
                        <div className="bhistory-room-img">
                          <img src={roomItem.img} alt={roomItem.title} />
                        </div>
                        <div className="bhistory-room-details">
                          <h4 className="bhistory-room-title">
                            {roomItem.title}
                          </h4>
                          <p className="bhistory-room-type">
                            {roomItem.features[0].detail +
                              ", " +
                              roomItem.features[1].detail +
                              ", " +
                              roomItem.features[2].detail}
                          </p>
                          <p className="bhistory-room-description">
                            {roomItem.shortDescription}
                          </p>

                          {roomItem.amenities.length === 0 ? (
                            ""
                          ) : (
                            <div className="bhistory-room-service">
                              {roomItem.amenities
                                .slice(0, 3) //get only first 3 furniture
                                .map((amenItem, idx) => (
                                  <div
                                    className="bhistory-service-item"
                                    key={`bhistory-amenItem ${idx}`}
                                  >
                                    • {amenItem}
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>

                        <div className="bhistory-room-quantity">
                          <div className="bhistory-quantity-control">
                            <span className="bhistory-card-room-count">
                              {0}
                            </span>
                          </div>
                        </div>

                        <div className="bhistory-room-price">
                          <div className="bhistory-price">
                            {roomItem.price.toLocaleString("vi-VN")} VND
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

              {/* <!-- Extra Bed --> */}
              <div className="bhistory-room-card extra-item">
                <div className="bhistory-room-img">
                  <img src={EXTRA_BED.img} alt={EXTRA_BED.title} />
                </div>
                <div className="bhistory-room-details">
                  <h4 className="bhistory-room-title">{EXTRA_BED.title}</h4>
                  <p className="bhistory-room-type">{EXTRA_BED.type}</p>
                </div>

                <div className="bhistory-room-quantity">
                  <div className="bhistory-quantity-control">
                    <span className="bhistory-extra-bed-count">{0}</span>
                  </div>
                </div>

                <div className="bhistory-room-price">
                  <div className="bhistory-price">
                    {EXTRA_BED.price.toLocaleString("vi-VN")} VND
                  </div>
                </div>
              </div>
            </div>

            {bookingList.length > 0 && selectedBooking && (
              <div className="bhistory-option-total">
                <div className="bhistory-option-details">
                  <p>
                    {selectedBooking.checkInDate.split("T")[0] +
                      " to " +
                      selectedBooking.checkOutDate.split("T")[0]}
                  </p>
                </div>
                <div className="bhistory-option-price">
                  <div className="bhistory-total-label">Total cost:</div>
                  <div className="bhistory-total-price">
                    {selectedBooking.totalPrice.toLocaleString("vi-VN")} VND
                  </div>
                </div>
              </div>
            )}

            {/* <!-- Review --> */}
            <div className="bhistory-room-review">
              <textarea
                placeholder="Write your review here..."
                className="bhistory-review-input"
                value={selectedReviewContent}
                onChange={(e) => setSelectedReviewContent(e.target.value)}
              ></textarea>
              <button
                className="bhistory-send-review"
                onClick={() => handleUpdateReview()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingHistory;
