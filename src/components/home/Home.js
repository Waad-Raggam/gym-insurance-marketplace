import React from "react";
import { Box, Typography, Button } from "@mui/material";
import MainContent from "../main/MainContent";
import "./Home.css";
import FormValidation from "../form/FormValidation";

export default function Home() {
  return (
    <>
      <FormValidation />
      <Box className="home">
        <Box className="overlay">
          <Typography variant="h2" component="h1" color="warning" gutterBottom>
            Protect Your Gym, Boost Your Profits
          </Typography>
          <Typography variant="h5" component="h3" color="inherit" gutterBottom>
            Comprehensive coverage tailored for fitness businesses
          </Typography>
          <Button 
            color="warning" 
            variant="contained" 
            size="large" 
            className="cta-button"
          >
            Get Insured Now
          </Button>
        </Box>
      </Box>
      <MainContent />
    </>
  );
}
