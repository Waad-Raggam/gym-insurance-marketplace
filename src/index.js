import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1D1A05", // Smoky black
    },
    secondary: {
      main: "#92140C", // Penn red
    },
    warning: {
      main: "#FFBA08", // Selective yellow
    },
    background: {
      default: "#6D7275", // Dim gray
    },
    text: {
      primary: "#E8EBF7", // Ghost white
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
