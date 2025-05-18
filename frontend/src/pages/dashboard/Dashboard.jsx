import React, { useEffect, useState } from "react";
import "./dashboard.css";
import {
  API_URL,
  assets,
  BOOKINGS_TAB_KEY,
  DASHBOARD_BOOKING_FIELD_MODAL,
  DASHBOARD_PARKING_SERVICE_FIELD_MODAL,
  DASHBOARD_ROOM_FIELD_MODAL,
  DASHBOARD_ROOM_SERVICE_FIELD_MODAL,
  DASHBOARD_TABS,
  DASHBOARD_USER_FIELD_MODAL,
  MOCK_BOOKINGS,
  MOCK_PARKING_SERVICES,
  MOCK_REVIEWS,
  MOCK_ROOM_SERVICES,
  MOCK_ROOMS,
  MOCK_USERS,
  PARKING_TAB_KEY,
  REVIEWS_TAB_KEY,
  ROOMS_TAB_KEY,
  RSERVICES_TAB_KEY,
  USERS_TAB_KEY,
} from "../../assets/assets";
import { Link } from "react-router-dom";
import DashboardSettingModal from "../../components/dashboardSettingModal/DashboardSettingModal";
import DashboardTable from "../../components/dashboardTable/DashboardTable";
import axios from "axios";
import { useHotel } from "../../context/HotelContext";

const Dashboard = () => {
  const { tabData, setTabData } = useHotel();
  const [activeTab, setActiveTab] = useState("users");

  const [staticFields, setStaticFields] = useState(DASHBOARD_USER_FIELD_MODAL);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchData = async (key) => {
    const response = await axios.get(API_URL + "/" + key);

    const data = response.data;
    setTabData((prev) => ({ ...prev, [key]: data }));

    return data;
  };

  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const handleTabChange = async (key, isForceRefresh = false) => {
    setActiveTab(key);
    switch (key) {
      case USERS_TAB_KEY:
        setStaticFields(DASHBOARD_USER_FIELD_MODAL);

        if (!tabData[key] || isForceRefresh) {
          const data = await fetchData(key);

          const mappedData = data.map((user) => ({
            id: user.userId,
            name: user.fullname,
            email: user.email,
            phone: user.phone,
            role: capitalizeFirstLetter(user.roleName),
            password: "",
          }));

          MOCK_USERS.mockData = mappedData;
        }

        setDashboardData(MOCK_USERS);
        break;
      case ROOMS_TAB_KEY:
        setStaticFields(DASHBOARD_ROOM_FIELD_MODAL);

        if (!tabData[key] || isForceRefresh) {
          const data = await fetchData(key);

          const mappedData = data.map((room) => ({
            id: room.roomId,
            name: room.roomTitle,
            type: room.roomType.roomTypeName,
            features: room.roomDescription,
            price: room.roomType.roomPrice,
            status: room.roomStatus,
          }));

          const roomTypes = await fetchData("roomtypes");

          MOCK_ROOMS.mockData = mappedData;
          MOCK_ROOMS.type = roomTypes;
        }

        setDashboardData(MOCK_ROOMS);
        break;
      case BOOKINGS_TAB_KEY:
        setStaticFields(DASHBOARD_BOOKING_FIELD_MODAL);

        if (!tabData[key] || isForceRefresh) {
          const data = await fetchData(key);
          const roomData = await fetchData("rooms");

          const mappedData = data.map((booking) => ({
            id: booking.bookingId,
            room: booking.bookingDetails
              .map((detail) => detail.roomId)
              .map((id) => {
                const room = roomData.find((r) => r.roomId === id);
                return room ? room.roomTitle : null;
              })
              .filter((title) => title !== null),
            userId: booking.userId,
            guest: booking.fullname,
            phone: booking.phone,
            checkIn: booking.checkInDate.split("T")[0],
            checkOut: booking.checkOutDate.split("T")[0],
            totalPrice: booking.totalPrice,
            status: booking.paymentStatus,
          }));

          MOCK_BOOKINGS.mockData = mappedData;
          MOCK_BOOKINGS.roomData = roomData;
        }

        setDashboardData(MOCK_BOOKINGS);
        break;
      case REVIEWS_TAB_KEY:
        setStaticFields(null);

        if (!tabData[key] || isForceRefresh) {
          const data = await fetchData(key);

          const mappedData = data.map((review) => ({
            id: review.reviewId,
            bookingId: review.bookingId,
            rooms: review.booking.bookingDetails.map((detail) => detail.roomId),
            content: review.reviewContent,
            rating: review.rating,
          }));

          MOCK_REVIEWS.mockData = mappedData;
        }

        setDashboardData(MOCK_REVIEWS);
        break;
      case RSERVICES_TAB_KEY:
        setStaticFields(DASHBOARD_ROOM_SERVICE_FIELD_MODAL);

        if (!tabData[key] || isForceRefresh) {
          const data = await fetchData(key);
          const roomData = await fetchData("rooms");

          const mappedData = data.map((service) => ({
            id: service.roomServiceId,
            roomNumber: service.room.roomTitle,
            date: service.datetime.split("T")[0],
            status: service.roomServiceStatus,
          }));

          MOCK_ROOM_SERVICES.mockData = mappedData;
          MOCK_ROOM_SERVICES.roomData = roomData;
        }

        setDashboardData(MOCK_ROOM_SERVICES);
        break;
      case PARKING_TAB_KEY:
        setStaticFields(DASHBOARD_PARKING_SERVICE_FIELD_MODAL);

        if (!tabData[key] || isForceRefresh) {
          const data = await fetchData(key);

          const mappedData = data.map((service) => ({
            id: service.parkingServiceId,
            bookingId: service.bookingId,
            parkingPlateNo: service.parkingPlateNo,
          }));

          MOCK_PARKING_SERVICES.mockData = mappedData;
        }

        setDashboardData(MOCK_PARKING_SERVICES);
        break;
    }
  };

  useEffect(() => {
    document.title = "Black Sun Hotel | Dashboard";

    handleTabChange(USERS_TAB_KEY);
  }, []);

  return (
    <div className="dashboard-wrapper">
      {/* <!-- HEADER --> */}
      <header className="dashboard-header">
        <div className="dashboard-nav-group left">
          <Link to={"/"} className="dashboard-logo">
            <img src={assets.logo} />
          </Link>
        </div>

        <div className="dashboard-nav-group right">
          <div className="dashboard-user-profile">
            <i className="bx bx-user-circle dashboard-user-icon"></i>
            <span className="dashboard-username">Administrator</span>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        {/* <!-- SIDE BAR --> */}
        <aside className="dashboard-sidebar">
          <ul className="dashboard-sidebar-menu">
            {DASHBOARD_TABS.map((item) => (
              <li
                key={item.key}
                className={`dashboard-menu-item ${
                  activeTab === item.key ? "active" : ""
                }`}
                onClick={() => handleTabChange(item.key)}
              >
                <a href="#">
                  <i className={`bx ${item.icon}`}></i> {item.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* <!-- MAIN CONTENT --> */}
        <main className="dashboard-main-content">
          {dashboardData !== null && (
            <DashboardTable
              dataObj={dashboardData}
              type={activeTab}
              staticFields={staticFields}
              refreshData={handleTabChange}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
