import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Item from "../pages/item";
import Markets from "../pages/markets";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Markets />} />
        <Route path="item" element={<Item />} />
      </Route>
    </Routes>
  );
};

export default Routing;
