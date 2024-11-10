import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import SearchInsurancePlans from "../search/SearchInsurancePlans";

export default function Navbar({ isAuthenticated, userData }) {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Gym Insurance
        </Typography>
        <Box sx={{ position: "relative" }}>
          <SearchInsurancePlans />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="#about">About Us</Button>
          <Button color="inherit" component={Link} to="#services">Services</Button>
          <Button color="inherit" component={Link} to="#contact">Contact</Button>
          {isAuthenticated && userData?.role === "Admin" ? (
            <Button component={Link} to="/profile" color="warning" variant="contained">
              Profile
            </Button>
          ) : (
            <Button component={Link} to="/login" color="warning" variant="contained">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
