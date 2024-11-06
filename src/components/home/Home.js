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
        <Typography component="h1">
          Protect Your Gym, Boost Your Profits
        </Typography>
        <Typography variant="h3" component="h3">
          Comprehensive coverage tailored for fitness businesses
        </Typography>
        <Button color="warning" variant="contained" size="large">
          Get Insured Now
        </Button>
      </Box>
      <MainContent />
    </>
  );
}
