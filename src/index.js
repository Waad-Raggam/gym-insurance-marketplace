import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E3A8A', // Navy Blue
    },
    secondary: {
      main: '#38B2AC', // Teal
    },
    warning: {
      main: '#F97316', // Orange
    },
    background: {
      default: '#F3F4F6', // Light Gray
    },
    text: {
      primary: '#333333', // Dark Gray for text
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
