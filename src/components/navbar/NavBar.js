import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchInsurancePlans from "../search/SearchInsurancePlans";

export default function Navbar({
  isAuthenticated,
  userData,
  setIsAuthenticated,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log(
      "Logged in user token before sign out:",
      localStorage.getItem("token")
    );
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    console.log(
      "Logged in user token after sign out:",
      localStorage.getItem("token")
    );

    setIsAuthenticated(false);

    navigate("/login");
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Gym Insurance Marketplace
        </Typography>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            gap: 20,
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
          }}
        >
          <SearchInsurancePlans />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          {isAuthenticated && userData.role === "Customer" ? (
            <Button component={Link} to="/plans" color="inherit">
              browse plans
            </Button>
          ) : null}
          {isAuthenticated && userData.role === "Customer" ? (
            <Button component={Link} to="/gymForm" color="inherit">
              Add gym
            </Button>
          ) : null}
          {/* <Button color="inherit" component={Link} to="#services">
            Services
          </Button>
          <Button color="inherit" component={Link} to="#contact">
            Contact
          </Button> */}
          {isAuthenticated && userData.role === "Customer" ? (
            <Button component={Link} to="/orders" color="inherit">
              Your orders
            </Button>
          ) : null}
          {isAuthenticated && userData.role === "Customer" ? (
            <Button component={Link} to="/cart" color="inherit">
              Cart
            </Button>
          ) : null}
          {isAuthenticated && userData.role === "Customer" ? (
            <Button
              component={Link}
              to="/profile"
              color="warning"
              variant="contained"
            >
              Profile
            </Button>
          ) : null}
          {isAuthenticated && userData.role === "Admin" ? (
            <Button
              component={Link}
              to="/dashboard"
              color="inherit"
            >
              Dashboard
            </Button>
          ) : null}

          {isAuthenticated ? (
            <Button onClick={handleLogout} color="warning" variant="contained">
              Logout
            </Button>
          ) : (
            <Button
              component={Link}
              to="/login"
              color="warning"
              variant="contained"
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
