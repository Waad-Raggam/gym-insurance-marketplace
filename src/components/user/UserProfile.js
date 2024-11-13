import React from 'react';
import { Typography, Box, TextField, List, ListItem, ListItemText, Alert } from "@mui/material";

export default function UserProfile(props) {
  const { userData, userGyms } = props;

  if (!userData) return <div>Loading user data...</div>;
  if (!userGyms) return <div>Loading gyms...</div>;

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

      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>Your Gyms</Typography>
      {userGyms.length > 0 ? (
        <List>
          {userGyms.map((gym) => (
            <ListItem key={gym.gymId} sx={{ borderBottom: '1px solid #ddd', paddingBottom: 1 }}>
              <ListItemText
                primary={gym.gymName}
                secondary={
                  <>
                    <div>Location: {gym.location}</div>
                    <div>Contact: {gym.contactName} ({gym.contactPhone})</div>
                    <div>Email: {gym.contactEmail}</div>
                    <div>Annual Revenue: ${gym.annualRevenue.toLocaleString()}</div>
                    <div>Capacity: {gym.memberCapacity} members</div>
                    <div>Employees: {gym.numberOfEmployees}</div>
                    <div>Hours: {gym.hoursOfOperation}</div>
                    <div>Facilities: {gym.facilities.join(", ")}</div>
                    <div>Services: {gym.services.join(", ")}</div>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Alert severity="info" sx={{ marginTop: 2 }}>
          You have no gyms associated with your account. Add a gym to get started.
        </Alert>
      )}
    </Box>
  );
}
