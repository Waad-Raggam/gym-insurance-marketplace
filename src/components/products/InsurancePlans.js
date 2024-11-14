import React, { useState } from "react";
import { Card, CardContent, CardActionArea, Typography, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./InsurancePlans.css";

export default function InsurancePlans(props) {
  const { response, userGyms } = props;
  const [selectedGyms, setSelectedGyms] = useState([]);
  const [maxPrice, setMaxPrice] = useState("");

  const handleGymSelect = (gymId) => {
    setSelectedGyms((prevSelectedGyms) => {
      const updatedSelectedGyms = prevSelectedGyms.includes(gymId)
        ? prevSelectedGyms.filter((id) => id !== gymId)
        : [...prevSelectedGyms, gymId];
      return updatedSelectedGyms;
    });
  };

  const filteredPlans = response.filter(
    (plan) => !maxPrice || plan.monthlyPremium <= parseFloat(maxPrice)
  );

  return (
    <div className="plans-grid">
      <h1>Your Gyms</h1>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Select the gyms you'd like to insure before selecting a plan.
      </Typography>
      <div className="gyms-row">
        {Array.isArray(userGyms) && userGyms.length > 0 ? (
          userGyms.map((gym) => (
            <Card
              key={gym.gymId}
              className={`gym-card ${
                selectedGyms.includes(gym.gymId) ? "selected" : ""
              }`}
              onClick={() => handleGymSelect(gym.gymId)}
              sx={{
                margin: "10px",
                cursor: "pointer",
                border: selectedGyms.includes(gym.gymId)
                  ? "2px solid #1976d2"
                  : "1px solid #ccc",
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography variant="h6" color="secondary">
                    {gym.gymName}
                  </Typography>
                  <Typography variant="body2">{gym.gymLocation}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <Typography variant="body2">No gyms available.</Typography>
        )}
      </div>

      <h1>Insurance Plans</h1>
      <TextField
        label="Max Monthly Premium"
        variant="outlined"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        // fullWidth
        margin="normal"
        InputProps={{
          style: { color: "#000000" },
        }}
      />

      <div className="gyms-row" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {Array.isArray(filteredPlans) && filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => (
            <Card
              key={plan.insuranceId}
              className="card"
              sx={{ margin: "20px auto" }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {plan.planName}
                  </Typography>
                  <Typography variant="body2">
                    Monthly Premium: ${plan.monthlyPremium}
                  </Typography>
                  <Typography variant="body2">
                    {plan.planDescription}
                  </Typography>
                  <Typography variant="body2">
                    Coverage Type: {plan.coverageType}
                  </Typography>
                  <Typography variant="body2">
                    Coverage Details:
                    <ul>
                      {plan.coverageDetails.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </Typography>
                </CardContent>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
                  <Link to={`${plan.insuranceId}?gymId=${selectedGyms.join(",")}`}>
                    <Button variant="outlined">View plan</Button>
                  </Link>
                </div>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <Typography variant="body2">No insurance plans available within the selected price range.</Typography>
        )}
      </div>
    </div>
  );
}
