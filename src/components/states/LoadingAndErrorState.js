import React from 'react';
import { CircularProgress, Typography, Box, Alert } from '@mui/material';

export default function LoadingAndErrorState(props) {
    const { loading, error, children } = props;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress color="primary" />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Please wait
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Alert severity="error">
          {error}
        </Alert>
      </Box>
    );
  }

  return <>{children}</>;
};
