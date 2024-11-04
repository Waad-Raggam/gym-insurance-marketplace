import React from "react";
import { Card, CardContent, CardActionArea, Typography } from "@mui/material";
import './InsurancePlans.css';

export default function InsurancePlans(props) {
  const { response } = props;

  return (
    <div className="plans-grid">
      <h1>Insurance Plans</h1>
      {Array.isArray(response) && response.length > 0 ? (
        response.map((plan) => (
          <Card key={plan.insuranceId} className="card" sx={{ margin: '20px auto' }}>
            <CardActionArea>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {plan.planName}
                </Typography>
                <Typography variant="body2">
                  Monthly Premium: ${plan.monthlyPremium}
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
            </CardActionArea>
          </Card>
        ))
      ) : (
        <Typography variant="body2" sx={{ color: '#E8EBF7' }}>No insurance plans available.</Typography>
      )}
    </div>
  );
}
