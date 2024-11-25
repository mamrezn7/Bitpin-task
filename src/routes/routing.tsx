import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Item from "../pages/orders";
import Markets from "../pages/markets";
import Orders from "../pages/orders";
import Profile from "../pages/profile";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Markets />} />
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  );
};

export default Routing;
