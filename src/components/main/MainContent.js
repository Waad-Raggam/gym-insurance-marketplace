import React from "react";
import { Card, CardContent, CardActionArea, Typography, Button } from "@mui/material";
import './MainContent.css'; 

export default function MainContent() {
  return (
    <div className="services-grid">
      {/* First Card */}
      <Card sx={{ maxWidth: 300, fontFamily: 'Oswald, sans-serif' }}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{  color: "text.secondary",fontFamily: 'Oswald, sans-serif' }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: 'Roboto Condensed, sans-serif' }}>
              We provide reliable and affordable insurance options tailored to meet the unique needs of fitness businesses.
            </Typography>
          </CardContent>
          {/* <Button variant="outlined" sx={{ fontFamily: 'Roboto Condensed, sans-serif' }}>View product</Button>
          <Button variant="contained" color="primary" sx={{ fontFamily: 'Roboto Condensed, sans-serif' }}>
            Add to favorites
          </Button> */}
        </CardActionArea>
      </Card>

      {/* Second Card */}
      <Card sx={{ maxWidth: 300, fontFamily: 'Oswald, sans-serif' }}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{  color: "text.secondary",fontFamily: 'Oswald, sans-serif' }}>
              Our Services
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: 'Roboto Condensed, sans-serif' }}>
              We offer comprehensive insurance services including liability and property protection.
              <ul>
                <li>Property Insurance</li>
                <li>Liability Coverage</li>
                <li>Equipment Protection</li>
                <li>Employee Insurance</li>
              </ul>
            </Typography>
          </CardContent>
          {/* <Button variant="outlined" sx={{ fontFamily: 'Roboto Condensed, sans-serif' }}>View product</Button>
          <Button variant="contained" color="primary" sx={{ fontFamily: 'Roboto Condensed, sans-serif' }}>
            Add to favorites
          </Button> */}
        </CardActionArea>
      </Card>

      {/* Third Card */}
      <Card sx={{ maxWidth: 300, fontFamily: 'Oswald, sans-serif' }}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{  color: "text.secondary",fontFamily: 'Oswald, sans-serif' }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: 'Roboto Condensed, sans-serif' }}>
              Ready to get started? Reach out for a custom quote tailored to your business.
            </Typography>
          </CardContent>
          {/* <Button variant="outlined" sx={{ fontFamily: 'Roboto Condensed, sans-serif' }}>View product</Button>
          <Button variant="contained" color="primary" sx={{ fontFamily: 'Roboto Condensed, sans-serif' }}>
            Add to favorites
          </Button> */}
        </CardActionArea>
      </Card>
    </div>
  );
};

