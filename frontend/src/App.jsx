import React, { useEffect } from "react";
import Header from "./components/header/Header";
import Hero from "./pages/sections/hero/Hero";
import Bookingbar from "./components/bookingbar/Bookingbar";
import History from "./pages/sections/history/History";
import Rooms from "./pages/sections/rooms/Rooms";
import Slider from "./pages/sections/slider/Slider";
import HotelServices from "./pages/sections/hotel-services/HotelServices";
import HotelLocation from "./pages/sections/hotel-location/HotelLocation";
import Footer from "./components/footer/Footer";
import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ServicesDetails from "./pages/servicesDetails/ServicesDetails";
import Policy from "./pages/policy/Policy";
import PlainPage from "./pages/PlainPage";
import BookingCancel from "./pages/bookingCancel/BookingCancel";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import SettingPage from "./pages/SettingPage";
import CheckAvailability from "./pages/checkAvailability/CheckAvailability";
import ConfirmAndPayment from "./pages/confirmAndPayment/ConfirmAndPayment";
import BookingHistory from "./pages/bookingHistory/BookingHistory";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import { useHotel } from "./context/HotelContext";

const App = () => {
  const { login } = useHotel();

  const plainPages = [
    {
      path: "/services-details",
      component: <ServicesDetails></ServicesDetails>,
    },
    {
      path: "/policy-details",
      component: <Policy></Policy>,
    },
    {
      path: "/booking-cancel",
      component: <BookingCancel></BookingCancel>,
    },
    {
      path: "/login",
      component: <Login></Login>,
    },
    {
      path: "/signup",
      component: <Signup></Signup>,
    },
    {
      path: "/dashboard",
      component: <Dashboard></Dashboard>,
    },
  ];
  const settingPages = [
    {
      path: "/check-availability",
      component: <CheckAvailability></CheckAvailability>,
    },
    {
      path: "/confirm",
      component: <ConfirmAndPayment></ConfirmAndPayment>,
    },
    {
      path: "/booking-history",
      component: <BookingHistory></BookingHistory>,
    },
    {
      path: "/profile",
      component: <Profile></Profile>,
    },
  ];

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      login(null, storedToken, storedUser);
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage>
            <Hero></Hero>
            <Bookingbar></Bookingbar>
            <History></History>
            <Rooms></Rooms>
            <Slider></Slider>
            <HotelServices></HotelServices>
            <HotelLocation></HotelLocation>
          </HomePage>
        }
      ></Route>
      {plainPages.map(({ path, component }) => (
        <Route
          key={path}
          path={path}
          element={<PlainPage>{component}</PlainPage>}
        ></Route>
      ))}
      {settingPages.map(({ path, component }) => (
        <Route
          key={path}
          path={path}
          element={<SettingPage>{component}</SettingPage>}
        ></Route>
      ))}
    </Routes>
  );
};

export default App;
