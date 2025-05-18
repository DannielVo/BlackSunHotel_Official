import React from "react";
import "./dashboardSettingModal.css";
import { BOOKINGS_TAB_KEY } from "../../assets/assets";

const DashboardSettingModal = ({
  isOpen,
  title,
  originItem,
  originFields,
  onClose,
  confirmText = "Submit",
  handleAdd,
  handleEdit,
  activeTab,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      //Add func
      handleAdd(fields);
    } else {
      handleEdit(fields);
    }
  };

  // Tạo field với giá trị từ `item`
  const fields = originItem
    ? {
        ...originFields,
        fieldItems: originFields.fieldItems.map((fieldItem) => ({
          ...fieldItem,
          value: originItem?.[fieldItem.name] ?? fieldItem.value ?? "",
        })),
      }
    : originFields;

  return (
    <>
      <div className="dashboard-modal" onClick={handleOverlayClick}>
        <div className="modal-content" onClick={handleModalClick}>
          <span className="close-btn" id="closeAddUserPopup" onClick={onClose}>
            &times;
          </span>
          <h2>{title || originFields.title}</h2>
          <form id={fields.id} onSubmit={onSubmit}>
            {fields.fieldItems.map(
              (field, index) =>
                // Add func và id ko đc xuat hien cung nhau; Edit func va password ko dc xuat hien cung nhau
                !(
                  (title === "" && field.name === "id") ||
                  (title !== "" && field.name === "password") ||
                  (title === "" && field.name === "userId") ||
                  field.name === "price"
                ) && (
                  <div className="form-group grid-form" key={`field ${index}`}>
                    <label htmlFor={field.id}>{field.label}</label>
                    {field.type === "select" ? (
                      <select
                        id={field.id}
                        name={field.name}
                        defaultValue={field.value}
                        required={field.required}
                        disabled={field.readOnly}
                        onChange={(e) => (field.value = e.target.value)}
                      >
                        {field.options.map((option, idx) => (
                          <option value={option.value} key={`option ${idx}`}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        id={field.id}
                        required={field.required}
                        name={field.name}
                        disabled={
                          field.readOnly ||
                          field.name === "id" ||
                          (activeTab === BOOKINGS_TAB_KEY && title !== "")
                        }
                        defaultValue={field.value}
                        onChange={(e) => (field.value = e.target.value)}
                      />
                    )}
                  </div>
                )
            )}
            <button type="submit" className="confirm-btn">
              {confirmText}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DashboardSettingModal;
