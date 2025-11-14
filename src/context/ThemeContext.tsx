import React, { useState, useEffect, type ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { ThemeName } from '../theme/types';
import { themes } from '../theme/themes';
import { createAppTheme } from '../theme/themeFactory';
import { ThemeContext } from '@/theme';

interface AppThemeProviderProps {
  children: ReactNode;
}

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('blueEclipse');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') as ThemeName;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    } else if (savedTheme) {
      // If saved theme doesn't exist in our new themes, clear it and use default
      console.warn(`Saved theme '${savedTheme}' no longer exists, using default theme`);
      localStorage.removeItem('app-theme');
    }
  }, []);

  // Save theme to localStorage when changed
  const setTheme = React.useCallback((themeName: ThemeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem('app-theme', themeName);
  }, []);

  const theme = React.useMemo(() => {
    const themeConfig = themes[currentTheme];
    if (!themeConfig) {
      console.warn(`Theme '${currentTheme}' not found, falling back to 'academicExcellence'`);
      return createAppTheme(themes['academicExcellence']);
    }
    return createAppTheme(themeConfig);
  }, [currentTheme]);

  const value = React.useMemo(
    () => ({
      currentTheme,
      setTheme,
      availableThemes: themes,
    }),
    [currentTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
