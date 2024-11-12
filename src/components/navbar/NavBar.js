import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchInsurancePlans from "../search/SearchInsurancePlans";

export default function Navbar({ isAuthenticated, userData, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logged in user token before sign out:", localStorage.getItem("token"));
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated"); 
    console.log("Logged in user token after sign out:", localStorage.getItem("token"));

    setIsAuthenticated(false); 

    navigate("/login"); 
  };

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
          <Button color="inherit" component={Link} to="#about">
            About Us
          </Button>
          <Button color="inherit" component={Link} to="#services">
            Services
          </Button>
          <Button color="inherit" component={Link} to="#contact">
            Contact
          </Button>
          <Link to="/cart">Cart</Link>
          {isAuthenticated ? (
            <Button component={Link} to="/profile" color="warning" variant="contained">
              Profile
            </Button>
          ) : null}

          {isAuthenticated ? (
            <Button onClick={handleLogout} color="warning" variant="contained">
              Logout
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
