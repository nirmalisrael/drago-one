// theme/index.ts - Enhanced Theme Configuration
import { createTheme, alpha, type ThemeOptions } from '@mui/material/styles';

// Layout Constants (move to theme for consistency)
export const LAYOUT_CONFIG = {
  drawer: {
    width: 280,
    collapsedWidth: 72,
  },
  appBar: {
    height: {
      desktop: 64,
      mobile: 56,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    small: 2,
    medium: 4,
    large: 8,
  },
  shadows: {
    light: '0 2px 8px rgba(0,0,0,0.08)',
    medium: '0 4px 16px rgba(0,0,0,0.12)',
    heavy: '0 8px 32px rgba(0,0,0,0.16)',
  },
} as const;

// Color Palette
const palette = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#dc004e',
    light: '#ff5983',
    dark: '#9a0036',
    contrastText: '#ffffff',
  },
  background: {
    default: '#f8fafc',
    paper: '#ffffff',
  },
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
  },
  divider: '#e2e8f0',
  error: {
    main: '#ef4444',
    light: '#f87171',
    dark: '#dc2626',
  },
  warning: {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
  },
  success: {
    main: '#10b981',
    light: '#34d399',
    dark: '#059669',
  },
  info: {
    main: '#3b82f6',
    light: '#60a5fa',
    dark: '#2563eb',
  },
} as const;

// Typography Configuration
const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h1: {
    fontSize: '2.5rem',
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h6: {
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.4,
  },
} as const;

// Component Overrides
const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarWidth: 'thin',
        scrollbarColor: `${alpha(palette.primary.main, 0.3)} transparent`,
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: alpha(palette.divider, 0.1),
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: alpha(palette.primary.main, 0.3),
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: alpha(palette.primary.main, 0.5),
          },
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: LAYOUT_CONFIG.borderRadius.medium,
        textTransform: 'none' as const,
        fontWeight: 500,
        padding: '6px 14px',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: LAYOUT_CONFIG.shadows.light,
          transform: 'translateY(-1px)',
        },
        transition: 'all 0.2s ease-in-out',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: LAYOUT_CONFIG.borderRadius.large,
        boxShadow: LAYOUT_CONFIG.shadows.light,
        border: `1px solid ${alpha(palette.divider, 0.12)}`,
        background: `linear-gradient(135deg, 
          ${palette.background.paper} 0%, 
          ${alpha(palette.primary.main, 0.01)} 100%)`,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        // borderRadius: LAYOUT_CONFIG.borderRadius.medium,
        backgroundImage: 'none',
      },
      elevation1: {
        boxShadow: LAYOUT_CONFIG.shadows.light,
      },
      elevation2: {
        boxShadow: LAYOUT_CONFIG.shadows.medium,
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: LAYOUT_CONFIG.borderRadius.medium,
        '&:hover': {
          transform: 'scale(1.05)',
        },
        transition: 'all 0.2s ease-in-out',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: LAYOUT_CONFIG.borderRadius.medium,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(palette.primary.main, 0.5),
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: '2px',
          },
        },
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: LAYOUT_CONFIG.borderRadius.small,
        margin: '2px 8px',
        '&:hover': {
          transform: 'translateX(4px)',
        },
        '&.Mui-selected': {
          backgroundColor: alpha(palette.primary.main, 0.12),
          '&:hover': {
            backgroundColor: alpha(palette.primary.main, 0.18),
          },
        },
        transition: 'all 0.2s ease-in-out',
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: alpha('#000000', 0.9),
        backdropFilter: 'blur(10px)',
        borderRadius: LAYOUT_CONFIG.borderRadius.small,
        fontSize: '0.75rem',
        fontWeight: 500,
      },
      arrow: {
        color: alpha('#000000', 0.9),
      },
    },
  },
  MuiBadge: {
    styleOverrides: {
      badge: {
        fontWeight: 600,
        fontSize: '0.75rem',
        minWidth: '20px',
        height: '20px',
        borderRadius: '10px',
      },
    },
  },
} as const;

// Create the theme
const themeOptions: ThemeOptions = {
  palette,
  typography,
  components,
  shape: {
    borderRadius: LAYOUT_CONFIG.borderRadius.medium,
  },
  spacing: 8,
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
};

// Create and export the theme
const theme = createTheme(themeOptions);

// Export the theme and configuration
export default theme;
export type AppTheme = typeof theme;

// Utility function for creating responsive styles
export const responsive = {
  up: (breakpoint: keyof typeof theme.breakpoints.values) =>
    `@media (min-width:${theme.breakpoints.values[breakpoint]}px)`,
  down: (breakpoint: keyof typeof theme.breakpoints.values) =>
    `@media (max-width:${theme.breakpoints.values[breakpoint] - 0.02}px)`,
  between: (
    start: keyof typeof theme.breakpoints.values,
    end: keyof typeof theme.breakpoints.values
  ) => `@media (min-width:${theme.breakpoints.values[start]}px) and (max-width:${theme.breakpoints.values[end] - 0.02
  }px)`,
};

// Additional theme utilities
export const getColorWithOpacity = (color: string, opacity: number) =>
  alpha(color, opacity);

export const getPrimaryColor = (opacity = 1) =>
  getColorWithOpacity(palette.primary.main, opacity);