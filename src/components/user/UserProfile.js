import React from 'react';
import { Typography, Box, TextField, Button } from "@mui/material";

export default function UserProfile({ userData }) {
  if (!userData) return <div>Loading...</div>; 

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>User Profile</Typography>
      <Box sx={{ marginBottom: 2 }}>
        <TextField label="Name" value={userData.name} fullWidth disabled variant="outlined" />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField label="Email" value={userData.email} fullWidth disabled variant="outlined" />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField label="Role" value={userData.role} fullWidth disabled variant="outlined" />
      </Box>
      
      {/* <Button variant="contained" color="primary">
        Update Profile
      </Button> */}
    </Box>
  );
}
