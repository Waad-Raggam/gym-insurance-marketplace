import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import SearchInsurancePlans from "../search/SearchInsurancePlans";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gym Insurance
          </Typography>
          <Box sx={{ position: "relative" }}>
            <SearchInsurancePlans />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" href="#about">
              About Us
            </Button>
            <Button color="inherit" href="#services">
              Services
            </Button>
            <Button color="inherit" href="#contact">
              Contact
            </Button>
            <Link to="/register">
              <Button color="warning" variant="contained">
                Login
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
