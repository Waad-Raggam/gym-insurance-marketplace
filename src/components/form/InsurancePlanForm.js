import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function InsurancePlanForm() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    planName: "",
    monthlyPremium: "",
    coverageType: "",
    planDescription: "",
    coverageDetails: [],
  });
  const [responseMessage, setResponseMessage] = useState(null);

  const coverageOptions = [
    "General Liability",
    "Workers’ Compensation",
    "Professional Liability",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      coverageDetails: checked
        ? [...prevData.coverageDetails, name]
        : prevData.coverageDetails.filter((item) => item !== name),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5125/api/v1/InsurancePlan/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setResponseMessage("Plan submitted successfully");
      console.log("Response:", response.data);
    //   navigate("/dashboard");
    } catch (error) {
      setResponseMessage("Error submitting plan");
      console.error("Error:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Insurance Plan Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Plan Name"
              name="planName"
              value={formData.planName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Monthly Premium"
              name="monthlyPremium"
              type="number"
              value={formData.monthlyPremium}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Coverage Type"
              name="coverageType"
              value={formData.coverageType}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Plan Description"
              name="planDescription"
              value={formData.planDescription}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Coverage Details</Typography>
            <FormGroup>
              {coverageOptions.map((coverage) => (
                <FormControlLabel
                  key={coverage}
                  control={
                    <Checkbox
                      name={coverage}
                      checked={formData.coverageDetails.includes(coverage)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={coverage}
                />
              ))}
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
          {responseMessage && (
            <Grid item xs={12}>
              <Typography
                variant="body1"
                color={
                  responseMessage.includes("Error") ? "error" : "success.main"
                }
              >
                {responseMessage}
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </Box>
  );
}
