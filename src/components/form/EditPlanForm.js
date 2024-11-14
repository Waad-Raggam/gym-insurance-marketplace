import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";

function EditPlanForm() {
  const { insuranceId } = useParams();
  const [formData, setFormData] = useState({
    planName: "",
    coverageType: "",
    monthlyPremium: 0,
    planDescription: "",
  });
  const navigate = useNavigate();
  const editPlanUrl = "http://localhost:5125/api/v1/InsurancePlan/";

  useEffect(() => {
    axios
      .get(`${editPlanUrl}${insuranceId}`)
      .then((response) => setFormData(response.data))
      .catch((error) => console.error("Error fetching plan data:", error));
  }, [insuranceId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSave = () => {
    const url = `${editPlanUrl}${insuranceId}`;
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const data = formData;
  
    console.log("Sending PUT request to API with:", {
      url,
      headers,
      data,
    });
  
    axios
      .put(url, data, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        console.log("Plan updated successfully");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error updating plan:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response headers:", error.response.headers);
        }
      });
  };  

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Edit Plan
      </Typography>
      <TextField
        label="Plan Name"
        name="planName"
        value={formData.planName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Monthly Premium"
        name="monthlyPremium"
        type="number"
        value={formData.monthlyPremium}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="planDescription"
        value={formData.planDescription}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate("/dashboard")}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default EditPlanForm;
