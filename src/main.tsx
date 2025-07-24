import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Ensure this file exists and contains your global styles
import App from './App'; // Import your App component without the extension
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './styles/theme'; // Import the theme from your styles folder
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter here

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* This resets browser styles */}
      <BrowserRouter> {/* Wrap the entire app with BrowserRouter */}
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
