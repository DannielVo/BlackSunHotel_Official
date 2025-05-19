import React, { useState } from "react";
import "./dashboardTable.css";
import RatingStars from "../ratingStars/RatingStars";
import DashboardSettingModal from "../dashboardSettingModal/DashboardSettingModal";
import {
  API_URL,
  BOOKINGS_TAB_KEY,
  MOCK_BOOKINGS,
  MOCK_ROOMS,
  PARKING_TAB_KEY,
  REVIEWS_TAB_KEY,
  ROOMS_TAB_KEY,
  RSERVICES_TAB_KEY,
  USERS_TAB_KEY,
} from "../../assets/assets";
import axios from "axios";

const DashboardTable = ({ dataObj, type, staticFields, refreshData }) => {
  const data = dataObj.mockData || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recordItem, setRecordItem] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
    setRecordItem(null);
    setModalTitle("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(API_URL + `/${type}/${id}`);
        refreshData(type, true);
      } catch (error) {
        console.error("Delete item failed", error);
      }
    }
  };

  const handleAdd = async (dataItem) => {
    var dataBody = {};

    switch (type) {
      case USERS_TAB_KEY:
        var currentMapping = {
          name: "fullname",
          email: "email",
          phone: "phone",
          role: "roleName",
          password: "password",
        };

        dataItem.fieldItems.forEach((field) => {
          const fieldName = field.name;
          const apiFieldName = currentMapping[fieldName] || fieldName;
          dataBody[apiFieldName] = field.value;

          if (fieldName === "role") {
            dataBody.isStaff = field.value.toLowerCase() !== "customer";
          }
        });
        break;

      case ROOMS_TAB_KEY:
        var currentMapping = {
          name: "roomTitle",
          type: "roomTypeId",
          features: "roomDescription",
          status: "roomStatus",
        };

        dataItem.fieldItems.forEach((field) => {
          const fieldName = field.name;
          if (currentMapping[fieldName]) {
            const apiFieldName = currentMapping[fieldName];

            if (fieldName === "type") {
              const typeId = dataObj.type.find(
                (x) =>
                  x.roomTypeName.toLowerCase() === field.value.toLowerCase()
              ).roomTypeId;
              dataBody[apiFieldName] = typeId;
            } else {
              dataBody[apiFieldName] = field.value;
            }
          }
        });

        dataBody.roomImage = "";
        break;

      case BOOKINGS_TAB_KEY:
        var currentMapping = {
          userId: "userId",
          guest: "fullname", //fullname, email, phone
          phone: "phone",
          checkIn: "checkInDate",
          checkOut: "checkOutDate",
          totalPrice: "totalPrice",
          status: "paymentStatus",
          room: "roomIds",
          //thêm note
        };

        dataItem.fieldItems.forEach((field) => {
          const fieldName = field.name;
          if (currentMapping[fieldName]) {
            const apiFieldName = currentMapping[fieldName];

            if (fieldName === "room") {
              const targetNames = field.value
                .split(",")
                .map((name) => name.trim());

              const matchedRoomIds = dataObj.roomData
                .filter((room) => targetNames.includes(room.roomTitle))
                .map((room) => room.roomId);

              dataBody[apiFieldName] = matchedRoomIds;
            } else {
              dataBody[apiFieldName] = field.value;
            }
          }
        });

        dataBody.notes = "";
        dataBody.email = "";
        dataBody.userId = null;
        break;

      case RSERVICES_TAB_KEY:
        var currentMapping = {
          id: "roomServiceId",
          roomNumber: "roomId", //roomTitle
          date: "datetime",
          status: "roomServiceStatus",
        };

        dataItem.fieldItems.forEach((field) => {
          const fieldName = field.name;
          if (currentMapping[fieldName]) {
            const apiFieldName = currentMapping[fieldName];

            if (fieldName === "roomNumber") {
              const targetNames = field.value
                .split(",")
                .map((name) => name.trim());

              const matchedRoomIds = dataObj.roomData
                .filter((room) => targetNames.includes(room.roomTitle))
                .map((room) => room.roomId);

              dataBody[apiFieldName] = matchedRoomIds[0];
            } else {
              dataBody[apiFieldName] = field.value;
            }
          }
        });

        break;

      case PARKING_TAB_KEY:
        var currentMapping = {
          id: "parkingServiceId",
          bookingId: "bookingId",
          parkingPlateNo: "parkingPlateNo",
        };

        dataItem.fieldItems.forEach((field) => {
          const fieldName = field.name;
          if (currentMapping[fieldName]) {
            const apiFieldName = currentMapping[fieldName];
            dataBody[apiFieldName] = field.value;
          }
        });

        break;
    }

    try {
      await axios.post(API_URL + `/${type}`, dataBody);
      alert("Successfully added new item!");
      refreshData(type, true);
    } catch (error) {
      alert(
        "Add item failed. Please check the data input and try again later!",
        error
      );
    }
  };

  const handleEdit = async (dataItem) => {
    var dataBody = {};
    var dataId = 0;

    switch (type) {
      case USERS_TAB_KEY:
        var currentMapping = {
          name: "fullname",
          email: "email",
          phone: "phone",
          role: "roleName",
        };

        dataItem.fieldItems.forEach((field) => {
          const fieldName = field.name;
          if (currentMapping[fieldName]) {
            const apiFieldName = currentMapping[fieldName];
            dataBody[apiFieldName] = field.value;

            if (fieldName === "role") {
              dataBody.isStaff = field.value.toLowerCase() !== "customer";
            }
          } else if (fieldName === "id") {
            dataId = field.value;
          }
        });

        break;

      case ROOMS_TAB_KEY:
        var currentMapping = {
          id: "roomId",
          name: "roomTitle",
          type: "roomTypeId",
          features: "roomDescription",
          status: "roomStatus",
        };

        dataItem.fieldItems.forEach((field) => {
          const fieldName = field.name;
          if (currentMapping[fieldName]) {
            const apiFieldName = currentMapping[fieldName];

            if (fieldName === "type") {
              const typeId = dataObj.type.find(
                (x) =>
                  x.roomTypeName.toLowerCase() === field.value.toLowerCase()
              ).roomTypeId;
              dataBody[apiFieldName] = typeId;
            } else if (fieldName === "id") {
              dataId = field.value;
            } else {
              dataBody[apiFieldName] = field.value;
            }
          }
        });

        dataBody.roomImage = "";
        break;

      case BOOKINGS_TAB_KEY:
        var currentMapping = {
          id: "bookingId",
          userId: "userId",
          guest: "fullname", //userId, fullname, email, phone
          phone: "phone",
          checkIn: "checkInDate",
          checkOut: "checkOutDate",
          totalPrice: "totalPrice",
          status: "paymentStatus",
          //thêm note
        };

        dataItem.fieldItems.forEach((field) => {
          const fieldName = field.name;
          if (currentMapping[fieldName]) {
            const apiFieldName = currentMapping[fieldName];

            if (fieldName === "id") {
              dataId = field.value;
            } else {
              dataBody[apiFieldName] = field.value;
            }
          }
        });

        dataBody.notes = "";
        dataBody.email = "";
        if (dataBody.userId === "") {
          dataBody.userId = null;
        }
        break;

      case RSERVICES_TAB_KEY:
        var currentMapping = {
          id: "roomServiceId",
          roomNumber: "roomId", //roomTitle
          date: "datetime",
          status: "roomServiceStatus",
        };

        dataItem.fieldItems.forEach((field) => {
          const fieldName = field.name;
          if (currentMapping[fieldName]) {
            const apiFieldName = currentMapping[fieldName];

            if (fieldName === "roomNumber") {
              const targetNames = field.value
                .split(",")
                .map((name) => name.trim());

              const matchedRoomIds = dataObj.roomData
                .filter((room) => targetNames.includes(room.roomTitle))
                .map((room) => room.roomId);

              dataBody[apiFieldName] = matchedRoomIds[0];
            } else if (fieldName === "id") {
              dataId = field.value;
            } else {
              dataBody[apiFieldName] = field.value;
            }
          }
        });

        break;

      case PARKING_TAB_KEY:
        var currentMapping = {
          id: "parkingServiceId",
          bookingId: "bookingId",
          parkingPlateNo: "parkingPlateNo",
        };

        dataItem.fieldItems.forEach((field) => {
          const fieldName = field.name;
          if (currentMapping[fieldName]) {
            const apiFieldName = currentMapping[fieldName];

            if (fieldName === "id") {
              dataId = field.value;
            } else {
              dataBody[apiFieldName] = field.value;
            }
          }
        });

        break;
    }

    try {
      await axios.put(API_URL + `/${type}/${dataId}`, dataBody);
      alert("Successfully updated new item!");
      refreshData(type, true);
    } catch (error) {
      alert(
        "Update item failed. Please check the data input and try again later!",
        error
      );
    }
  };

  const filteredData = (data) => {
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <div className="dashboard-content-section">
      <div className="dashboard-content-header">
        <div className="dashboard-rooms-left-part">
          <h2>{dataObj.title}</h2>
          {(data.length > 0 ||
            (data.length === 0 &&
              (type === RSERVICES_TAB_KEY ||
                type === PARKING_TAB_KEY ||
                type === BOOKINGS_TAB_KEY))) &&
            type !== REVIEWS_TAB_KEY && (
              <button
                className="dashboard-add-items-btn add-rooms"
                onClick={() => {
                  setRecordItem(null);
                  setModalTitle("");
                  setIsModalOpen(true);
                }}
              >
                {staticFields.title}
              </button>
            )}
        </div>
        <div className="dashboard-table-controls">
          {data.length > 0 && (
            <div className="dashboard-search-box">
              <span>Search:</span>
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {data.length === 0 ? (
        <p>There is nothing in database!</p>
      ) : (
        <table
          className={`dashboard-data-table ${
            type === "bookings" ? "dashboard-bookings-table" : ""
          }`}
        >
          <thead>
            <tr>
              {Object.keys(data[0] || {}).map(
                (key) =>
                  key.toLowerCase() !== "password" &&
                  key.toLowerCase() !== "userid" && (
                    <th key={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </th>
                  )
              )}

              {data.length > 0 && type !== REVIEWS_TAB_KEY && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData(data).map((item, index) => (
              <tr key={index}>
                {Object.entries(item).map(
                  ([key, val], i) =>
                    key !== "password" &&
                    key !== "userId" &&
                    (key === "status" ? (
                      <td key={i}>
                        <span
                          className={`dashboard-status ${val.toLowerCase()}`}
                        >
                          {val.charAt(0).toUpperCase() + val.slice(1)}
                        </span>
                      </td>
                    ) : key === "price" ? (
                      <td key={i}>{"VND " + val}</td>
                    ) : key === "rating" ? (
                      <td key={i}>
                        <RatingStars rating={val} />
                      </td>
                    ) : (
                      <td key={i}>{val}</td>
                    ))
                )}

                {type !== REVIEWS_TAB_KEY && (
                  <td className="dashboard-action-buttons">
                    <button
                      className="dashboard-edit-btn"
                      onClick={() => {
                        setRecordItem(item);
                        setModalTitle(staticFields.settingBtnTitle);
                        setIsModalOpen(true);
                      }}
                    >
                      <i className="bx bx-edit"></i>
                    </button>
                    <button
                      className="dashboard-delete-btn"
                      onClick={() => handleDelete(item.id || item.name)}
                    >
                      <i className="bx bx-trash"></i>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {data.length > 0 && (
        <div className="dashboard-table-footer">
          <div className="dashboard-pagination">
            <button disabled>Previous</button>
            <button className="active">1</button>
            <button>Next</button>
          </div>
        </div>
      )}

      <DashboardSettingModal
        isOpen={isModalOpen}
        title={modalTitle}
        originItem={recordItem}
        originFields={staticFields}
        onClose={closeModal}
        confirmText="Confirm"
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        activeTab={type}
      />
    </div>
  );
};

export default DashboardTable;
