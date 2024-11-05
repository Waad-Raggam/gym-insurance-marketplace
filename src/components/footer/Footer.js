import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import "./Footer.css";

export default function Footer() {
  return (
    <Box className="footer">
      <Typography variant="h6" className="footer-logo">
        Gym Insurance Platform
      </Typography>

      <Box className="footer-links">
        <Link href="#" underline="none">
          About Us
        </Link>
        <Link href="#" underline="none">
          Our Services
        </Link>
        <Link href="#" underline="none">
          Contact Us
        </Link>
        <Link href="#" underline="none">
          FAQs
        </Link>
      </Box>

      <Box className="footer-social">
        <IconButton href="#" color="inherit" aria-label="Facebook">
          <Facebook />
        </IconButton>
        <IconButton href="#" color="inherit" aria-label="Instagram">
          <Instagram />
        </IconButton>
        <IconButton href="#" color="inherit" aria-label="Twitter">
          <Twitter />
        </IconButton>
      </Box>

      <Typography variant="body2" className="footer-copyright">
        © {new Date().getFullYear()} Gym Insurance Platform. All rights reserved.
      </Typography>
    </Box>
  );
}
