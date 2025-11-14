import { createTheme, alpha, type ThemeOptions } from '@mui/material/styles';
import type { ThemeConfig } from './types';
import { educationTypography } from './educationTypography';

// Layout Constants
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
    small: 1,
    medium: 2,
    large: 4,
  },
  shadows: {
    light: '0 2px 8px rgba(0,0,0,0.08)',
    medium: '0 4px 16px rgba(0,0,0,0.12)',
    heavy: '0 8px 32px rgba(0,0,0,0.16)',
  },
} as const;

// Typography is now handled by educationTypography.ts

// Legacy Blue Eclipse Theme Configuration (kept for backward compatibility)
export const blueEclipse: ThemeConfig = {
  name: 'blueEclipse' as any, // Legacy theme name
  displayName: 'Blue Eclipse',
  category: 'personalPreference',
  description: 'Legacy theme for backward compatibility',
  targetAudience: ['all'],
  accessibility: {
    contrastLevel: 'standard',
    colorblindFriendly: true,
    reducedMotion: false,
    largeText: false,
  },
  colors: {
    primary: {
      main: '#505081',
      light: '#8686AC',
      dark: '#272757',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0F0E47',
      light: '#505081',
      dark: '#272757',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#1f2937',
    },
    info: {
      main: '#0ea5e9',
      light: '#38bdf8',
      dark: '#0284c7',
      contrastText: '#ffffff',
    },
    education: {
      attendance: {
        present: '#10b981',
        absent: '#ef4444',
        late: '#f59e0b',
        excused: '#6b7280',
        tardy: '#f97316',
      },
      grades: {
        excellent: '#16a34a',
        good: '#3b82f6',
        average: '#f59e0b',
        poor: '#f97316',
        failing: '#ef4444',
        incomplete: '#6b7280',
        pending: '#8b5cf6',
      },
      status: {
        active: '#10b981',
        inactive: '#6b7280',
        pending: '#f59e0b',
        archived: '#9ca3af',
        draft: '#fbbf24',
        published: '#16a34a',
      },
      departments: {
        science: '#0891b2',
        arts: '#ec4899',
        business: '#7c3aed',
        humanities: '#f59e0b',
        engineering: '#1e40af',
        health: '#dc2626',
      },
      academic: {
        semester: '#1e3a8a',
        course: '#059669',
        assignment: '#7c3aed',
        exam: '#dc2626',
        project: '#f59e0b',
      },
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
      elevated: '#f1f5f9',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    text: {
      primary: '#272757',
      secondary: '#505081',
      disabled: '#8686AC',
      hint: '#64748b',
    },
    divider: '#e2e8f0',
    action: {
      hover: '#f1f5f9',
      selected: '#e0e7ff',
      disabled: '#f8fafc',
      focus: '#8686AC',
    },
    surface: {
      low: '#ffffff',
      medium: '#f8fafc',
      high: '#f1f5f9',
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
};

export const createAppTheme = (themeConfig: ThemeConfig) => {
  if (!themeConfig) {
    throw new Error('ThemeConfig is required but was not provided');
  }

  if (!themeConfig.colors) {
    throw new Error('ThemeConfig.colors is required but was not provided');
  }

  const { colors } = themeConfig;

  // Component Overrides with enhanced education-specific styling
  const components = {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: `${alpha(colors.primary.main, 0.3)} transparent`,
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-track': {
            backgroundColor: alpha(colors.divider, 0.1),
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: alpha(colors.primary.main, 0.3),
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: alpha(colors.primary.main, 0.5),
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
          border: `1px solid ${alpha(colors.divider, 0.12)}`,
          background: `linear-gradient(135deg, 
            ${colors.background.paper} 0%, 
            ${alpha(colors.primary.main, 0.01)} 100%)`,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: LAYOUT_CONFIG.borderRadius.medium,
            transition: 'all 0.2s ease-in-out',
            '&:hover:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled)': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: alpha(colors.primary.main, 0.6),
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.primary.main,
                borderWidth: '2px',
              },
              backgroundColor: alpha(colors.primary.main, 0.02),
            },
          },
          '& .MuiInputLabel-root': {
            '&.Mui-focused': {
              color: colors.primary.main,
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
          '&:hover': { transform: 'translateX(4px)' },
          '&.Mui-selected': {
            backgroundColor: alpha(colors.primary.main, 0.12),
            '&:hover': {
              backgroundColor: alpha(colors.primary.main, 0.18),
            },
          },
          transition: 'all 0.2s ease-in-out',
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
  };

  const themeOptions: ThemeOptions = {
    palette: {
      mode: 'light',
      ...colors,
      // Ensure all required Material-UI palette properties are present
      grey: colors.grey || {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
      },
      // Add education-specific palette extensions
      education: colors.education,
      surface: colors.surface,
    },
    typography: educationTypography as any, // Type compatibility with Material-UI
    components,
    shape: { borderRadius: LAYOUT_CONFIG.borderRadius.medium },
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
    },
  };

  return createTheme(themeOptions);
};