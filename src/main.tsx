// main.tsx - Replace your current main.tsx with this
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AppThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider> {/* Replace ThemeProvider with AppThemeProvider */}
      {/* CssBaseline is now included in AppThemeProvider */}
      <App />
    </AppThemeProvider>
  </StrictMode>
);
