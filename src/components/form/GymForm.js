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

export default function GymForm(props) {
  const { userData } = props;
  const [formData, setFormData] = useState({
    gymName: "",
    location: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    annualRevenue: "",
    memberCapacity: "",
    numberOfEmployees: "",
    hoursOfOperation: "",
    facilities: [],
    services: [],
  });
  const [responseMessage, setResponseMessage] = useState(null);

  const facilitiesList = ["Swimming Pool", "Gym", "Spa"];
  const servicesList = [
    "Personal Training",
    "Yoga Classes",
    "Nutrition Counseling",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e, type) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [type]: checked
        ? [...prevData[type], name]
        : prevData[type].filter((item) => item !== name),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = userData?.userId;
    if (!userId) {
      alert("User ID not found. Please log in.");
      return;
    }

    const formDataWithUserId = { ...formData, userId };
    console.log("Submitting form data:", formDataWithUserId);

    try {
      const response = await axios.post(
        "http://localhost:5125/api/v1/Gym/",
        formDataWithUserId,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setResponseMessage("Form submitted successfully");
      console.log("Response:", response.data);
    } catch (error) {
      setResponseMessage("Error submitting form");
      console.error("Error:", error);

      if (error.response && error.response.status === 400) {
        const { errors } = error.response.data;
        if (errors.Name) alert(errors.Name[0]);
        if (errors.Email) alert(errors.Email[0]);
        if (errors.Password) alert(errors.Password[0]);
        if (errors.PhoneNumber) alert(errors.PhoneNumber[0]);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Gym Registration Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Gym Name"
              name="gymName"
              value={formData.gymName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Contact Name"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Contact Phone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contact Email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Annual Revenue"
              name="annualRevenue"
              type="number"
              value={formData.annualRevenue}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Member Capacity"
              name="memberCapacity"
              type="number"
              value={formData.memberCapacity}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Number of Employees"
              name="numberOfEmployees"
              type="number"
              value={formData.numberOfEmployees}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Hours of Operation"
              name="hoursOfOperation"
              value={formData.hoursOfOperation}
              onChange={handleChange}
              fullWidth
              required
              placeholder="e.g., Mon-Fri 6:00-22:00, Sat-Sun 8:00-20:00"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Facilities</Typography>
            <FormGroup>
              {facilitiesList.map((facility) => (
                <FormControlLabel
                  key={facility}
                  control={
                    <Checkbox
                      name={facility}
                      checked={formData.facilities.includes(facility)}
                      onChange={(e) => handleCheckboxChange(e, "facilities")}
                    />
                  }
                  label={facility}
                />
              ))}
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Services</Typography>
            <FormGroup>
              {servicesList.map((service) => (
                <FormControlLabel
                  key={service}
                  control={
                    <Checkbox
                      name={service}
                      checked={formData.services.includes(service)}
                      onChange={(e) => handleCheckboxChange(e, "services")}
                    />
                  }
                  label={service}
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
