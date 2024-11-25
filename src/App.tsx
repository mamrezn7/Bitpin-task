import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Item from "./pages/orders";
import Routing from "./routes/routing";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

function App() {
  const theme = createTheme({ direction: "rtl" });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Routing />
      </ThemeProvider>
    </>
  );
}

export default App;
