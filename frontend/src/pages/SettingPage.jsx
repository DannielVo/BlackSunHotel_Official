import React from "react";
import HeaderSettingPage from "../components/headerSettingPage/HeaderSettingPage";

const SettingPage = ({ children }) => {
  return (
    <>
      <HeaderSettingPage></HeaderSettingPage>
      <main>{children}</main>
    </>
  );
};

export default SettingPage;
