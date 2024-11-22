import { AccountCircle, MenuBook } from "@mui/icons-material";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";

import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/shared/navbar";
import axios from "axios";

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Box>
        {/* <Grid container >
          <Grid size={12}> */}
        <Container maxWidth={"lg"}>
          <Outlet />
        </Container>
        {/* </Grid>
        </Grid> */}
      </Box>
    </Box>
  );
};

export default Home;
