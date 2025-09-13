// Additional types for theme system
export type ThemeName =
  | 'academicBlue'
  | 'modernTeal'
  | 'scholarlyGreen'
  | 'royalPurple'
  | 'midnightPro'
  | 'warmAcademia'
  | 'professionalDark'
  | 'blueEclipse'
  | 'ocean'
  | 'sunset'
  | 'forest'
  | 'midnight'
  | 'royal'
  | 'stormyMorning'
  | 'saltAndPepper'
  | 'calmBlue'
  | 'underTheMoonlight'
  | 'emeraldOdyssey';

// types.ts - Updated ThemeConfig interface
export interface ThemeConfig {
  name: ThemeName;
  displayName: string;
  colors: {
    grey: { 50: string; 100: string; 200: string; 300: string; 400: string; 500: string; 600: string; 700: string; 800: string; 900: string; };
    primary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    secondary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    // Add semantic colors for better UX
    success?: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    error?: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    warning?: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    info?: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    background: {
      default: string;
      paper: string;
      elevated?: string; // For cards, modals, elevated surfaces
    };
    text: {
      primary: string;
      secondary: string;
      disabled?: string; // For disabled states
    };
    divider: string;
    // Add interaction states
    action?: {
      hover: string;
      selected: string;
      disabled: string;
    };
    // Add focus indicator color
    focus?: string;
    // Add surface hierarchy colors
    surface?: {
      low: string;    // Cards, modals
      medium: string; // Sections, containers
      high: string;   // Headers, toolbars
    };
  };
}

export type ThemeMode = 'light' | 'dark';

// Extended theme configuration for Material-UI
export interface ExtendedTheme {
  palette: {
    mode: ThemeMode;
    primary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    secondary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    success: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    error: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    warning: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    info: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    background: {
      default: string;
      paper: string;
      elevated: string;
    };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
    divider: string;
    action: {
      hover: string;
      selected: string;
      disabled: string;
    };
    focus: string;
    surface: {
      low: string;
      medium: string;
      high: string;
    };
  };
}

// Utility type for theme creation
export interface ThemeOptions extends Partial<ExtendedTheme> {
  name: string;
  displayName: string;
}

declare module '@mui/material/styles' {
  interface Palette {
    focus: string;
    surface: {
      low: string;
      medium: string;
      high: string;
    };
  }

  interface PaletteOptions {
    focus?: string;
    surface?: {
      low?: string;
      medium?: string;
      high?: string;
    };
  }

  interface TypeBackground {
    elevated: string;
  }
}