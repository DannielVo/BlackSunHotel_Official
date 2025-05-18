import React, { useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const HomePage = ({ children }) => {
  useEffect(() => {
    document.title = "Black Sun Hotel";
  }, []);

  return (
    <>
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
};

export default HomePage;
