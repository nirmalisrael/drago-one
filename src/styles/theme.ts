// theme/index.ts - Enterprise Educational ERP Theme Configuration
import { createTheme, alpha, type ThemeOptions, type PaletteMode } from '@mui/material/styles';

// ============================================================================
// LAYOUT CONSTANTS
// ============================================================================
export const LAYOUT_CONFIG = {
  drawer: {
    width: 280,
    collapsedWidth: 72,
    miniWidth: 56,
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
    xxl: 40,
  },
  borderRadius: {
    none: 0,
    small: 4,
    medium: 8,
    large: 12,
    xl: 16,
    round: 9999,
  },
  shadows: {
    none: 'none',
    light: '0 2px 8px rgba(0,0,0,0.08)',
    medium: '0 4px 16px rgba(0,0,0,0.12)',
    heavy: '0 8px 32px rgba(0,0,0,0.16)',
    colored: '0 4px 16px rgba(25, 118, 210, 0.15)',
  },
  transitions: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
  },
} as const;

// ============================================================================
// COLOR PALETTE - Educational ERP Focused
// ============================================================================
const lightPalette = {
  mode: 'light' as PaletteMode,

  // Primary - Professional Blue (Trust, Stability, Learning)
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3',
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
    contrastText: '#ffffff',
  },

  // Secondary - Academic Purple (Creativity, Wisdom)
  secondary: {
    main: '#7c4dff',
    light: '#b47cff',
    dark: '#3f1dcb',
    50: '#ede7f6',
    100: '#d1c4e9',
    200: '#b39ddb',
    300: '#9575cd',
    400: '#7e57c2',
    500: '#673ab7',
    600: '#5e35b1',
    700: '#512da8',
    800: '#4527a0',
    900: '#311b92',
    contrastText: '#ffffff',
  },

  // Success - Green (Achievements, Progress)
  success: {
    main: '#10b981',
    light: '#34d399',
    dark: '#059669',
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    contrastText: '#ffffff',
  },

  // Warning - Amber (Attention, Pending)
  warning: {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    contrastText: '#1e293b',
  },

  // Error - Red (Critical, Failed)
  error: {
    main: '#ef4444',
    light: '#f87171',
    dark: '#dc2626',
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    contrastText: '#ffffff',
  },

  // Info - Cyan (Information, Notifications)
  info: {
    main: '#06b6d4',
    light: '#22d3ee',
    dark: '#0891b2',
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    contrastText: '#ffffff',
  },

  // Grey Scale (Comprehensive)
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

  // Background
  background: {
    default: '#f8fafc',
    paper: '#ffffff',
    neutral: '#f1f5f9',
    elevated: '#ffffff',
  },

  // Text
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    disabled: '#94a3b8',
    hint: '#cbd5e1',
  },

  // Divider
  divider: '#e2e8f0',

  // Action
  action: {
    active: '#1976d2',
    hover: alpha('#1976d2', 0.08),
    selected: alpha('#1976d2', 0.12),
    disabled: '#cbd5e1',
    disabledBackground: '#f1f5f9',
    focus: alpha('#1976d2', 0.12),
  },

  // Custom Educational Colors
  educational: {
    attendance: {
      present: '#10b981',
      absent: '#ef4444',
      late: '#f59e0b',
      excused: '#06b6d4',
    },
    grades: {
      excellent: '#10b981',
      good: '#22c55e',
      average: '#f59e0b',
      poor: '#f97316',
      fail: '#ef4444',
    },
    roles: {
      admin: '#7c4dff',
      teacher: '#1976d2',
      student: '#06b6d4',
      parent: '#10b981',
      staff: '#64748b',
    },
    status: {
      active: '#10b981',
      inactive: '#94a3b8',
      pending: '#f59e0b',
      suspended: '#ef4444',
    },
  },
} as const;

// Dark Mode Palette
const darkPalette = {
  mode: 'dark' as PaletteMode,

  primary: {
    main: '#42a5f5',
    light: '#64b5f6',
    dark: '#1976d2',
    contrastText: '#000000',
  },

  secondary: {
    main: '#b47cff',
    light: '#d4b3ff',
    dark: '#7c4dff',
    contrastText: '#000000',
  },

  success: {
    main: '#34d399',
    light: '#6ee7b7',
    dark: '#10b981',
    contrastText: '#000000',
  },

  warning: {
    main: '#fbbf24',
    light: '#fcd34d',
    dark: '#f59e0b',
    contrastText: '#000000',
  },

  error: {
    main: '#f87171',
    light: '#fca5a5',
    dark: '#ef4444',
    contrastText: '#000000',
  },

  info: {
    main: '#22d3ee',
    light: '#67e8f9',
    dark: '#06b6d4',
    contrastText: '#000000',
  },

  grey: {
    50: '#0f172a',
    100: '#1e293b',
    200: '#334155',
    300: '#475569',
    400: '#64748b',
    500: '#94a3b8',
    600: '#cbd5e1',
    700: '#e2e8f0',
    800: '#f1f5f9',
    900: '#f8fafc',
  },

  background: {
    default: '#0f172a',
    paper: '#1e293b',
    neutral: '#334155',
    elevated: '#334155',
  },

  text: {
    primary: '#f8fafc',
    secondary: '#cbd5e1',
    disabled: '#64748b',
    hint: '#475569',
  },

  divider: alpha('#cbd5e1', 0.12),

  action: {
    active: '#42a5f5',
    hover: alpha('#42a5f5', 0.08),
    selected: alpha('#42a5f5', 0.16),
    disabled: '#475569',
    disabledBackground: '#334155',
    focus: alpha('#42a5f5', 0.12),
  },
} as const;

// ============================================================================
// TYPOGRAPHY - Professional & Readable
// ============================================================================
const typography = {
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,

  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
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
    lineHeight: 1.5,
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.57,
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.6,
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.75,
    textTransform: 'none' as const,
    letterSpacing: '0.02em',
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: 2,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
  },
} as const;

// ============================================================================
// COMPONENT OVERRIDES - Enterprise Ready
// ============================================================================
const getComponents = (mode: PaletteMode) => {
  const palette = mode === 'light' ? lightPalette : darkPalette;

  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: `${alpha(palette.primary.main, 0.3)} transparent`,
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: mode === 'light' ? '#f1f5f9' : '#1e293b',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: alpha(palette.primary.main, 0.3),
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: alpha(palette.primary.main, 0.5),
            },
          },
        },
        '*': {
          boxSizing: 'border-box',
        },
        'html, body, #root': {
          height: '100%',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: LAYOUT_CONFIG.borderRadius.medium,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: LAYOUT_CONFIG.shadows.light,
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        sizeLarge: {
          padding: '10px 22px',
          fontSize: '0.9375rem',
        },
        sizeSmall: {
          padding: '6px 12px',
          fontSize: '0.8125rem',
        },
        containedPrimary: {
          '&:hover': {
            boxShadow: LAYOUT_CONFIG.shadows.colored,
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: LAYOUT_CONFIG.borderRadius.large,
          boxShadow: mode === 'light' ? LAYOUT_CONFIG.shadows.light : LAYOUT_CONFIG.shadows.medium,
          border: `1px solid ${alpha(palette.divider, mode === 'light' ? 0.12 : 0.05)}`,
          background: mode === 'light'
            ? `linear-gradient(135deg, ${palette.background.paper} 0%, ${alpha(palette.primary.main, 0.01)} 100%)`
            : palette.background.paper,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: mode === 'light' ? LAYOUT_CONFIG.shadows.medium : LAYOUT_CONFIG.shadows.heavy,
            transform: 'translateY(-2px)',
          },
        },
      },
    },

    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '20px 24px',
          borderBottom: `1px solid ${palette.divider}`,
        },
        title: {
          fontSize: '1.125rem',
          fontWeight: 600,
        },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: LAYOUT_CONFIG.borderRadius.medium,
        },
        elevation1: {
          boxShadow: LAYOUT_CONFIG.shadows.light,
        },
        elevation2: {
          boxShadow: LAYOUT_CONFIG.shadows.medium,
        },
        elevation3: {
          boxShadow: LAYOUT_CONFIG.shadows.heavy,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: LAYOUT_CONFIG.shadows.light,
          backdropFilter: 'blur(20px)',
          backgroundColor: alpha(palette.background.paper, 0.8),
          borderBottom: `1px solid ${palette.divider}`,
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: `1px solid ${palette.divider}`,
          boxShadow: LAYOUT_CONFIG.shadows.medium,
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: LAYOUT_CONFIG.borderRadius.medium,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: alpha(palette.primary.main, 0.08),
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: LAYOUT_CONFIG.borderRadius.medium,
            transition: 'all 0.2s ease-in-out',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(palette.primary.main, 0.5),
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '2px',
                borderColor: palette.primary.main,
              },
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: palette.primary.main,
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: LAYOUT_CONFIG.borderRadius.medium,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: LAYOUT_CONFIG.borderRadius.medium,
          fontWeight: 500,
          fontSize: '0.8125rem',
        },
        filled: {
          backgroundColor: alpha(palette.primary.main, 0.1),
          color: palette.primary.main,
          '&:hover': {
            backgroundColor: alpha(palette.primary.main, 0.15),
          },
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: LAYOUT_CONFIG.borderRadius.medium,
          padding: '12px 16px',
          fontSize: '0.875rem',
        },
        standardSuccess: {
          backgroundColor: alpha(palette.success.main, 0.1),
          color: mode === 'light' ? palette.success.dark : palette.success.light,
        },
        standardError: {
          backgroundColor: alpha(palette.error.main, 0.1),
          color: mode === 'light' ? palette.error.dark : palette.error.light,
        },
        standardWarning: {
          backgroundColor: alpha(palette.warning.main, 0.1),
          color: mode === 'light' ? palette.warning.dark : palette.warning.main,
        },
        standardInfo: {
          backgroundColor: alpha(palette.info.main, 0.1),
          color: mode === 'light' ? palette.info.dark : palette.info.light,
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: LAYOUT_CONFIG.borderRadius.small,
          margin: '2px 8px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateX(4px)',
            backgroundColor: palette.action.hover,
          },
          '&.Mui-selected': {
            backgroundColor: alpha(palette.primary.main, 0.12),
            borderLeft: `3px solid ${palette.primary.main}`,
            '&:hover': {
              backgroundColor: alpha(palette.primary.main, 0.18),
            },
          },
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '40px',
          color: 'inherit',
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: alpha('#000000', 0.92),
          backdropFilter: 'blur(10px)',
          borderRadius: LAYOUT_CONFIG.borderRadius.small,
          fontSize: '0.75rem',
          fontWeight: 500,
          padding: '8px 12px',
        },
        arrow: {
          color: alpha('#000000', 0.92),
        },
      },
    },

    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 600,
          fontSize: '0.6875rem',
          minWidth: '20px',
          height: '20px',
          borderRadius: '10px',
          padding: '0 6px',
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            fontWeight: 600,
            backgroundColor: mode === 'light' ? palette.grey[50] : palette.grey[100],
            borderBottom: `2px solid ${palette.divider}`,
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${palette.divider}`,
          padding: '16px',
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: palette.action.hover,
          },
          '&.MuiTableRow-hover:hover': {
            backgroundColor: alpha(palette.primary.main, 0.04),
          },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${palette.divider}`,
        },
        indicator: {
          height: '3px',
          borderRadius: '3px 3px 0 0',
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.9375rem',
          minHeight: '48px',
          '&.Mui-selected': {
            fontWeight: 600,
          },
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: palette.divider,
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: LAYOUT_CONFIG.borderRadius.round,
          height: '8px',
        },
      },
    },

    MuiCircularProgress: {
      styleOverrides: {
        root: {
          strokeLinecap: 'round',
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: LAYOUT_CONFIG.borderRadius.large,
          boxShadow: LAYOUT_CONFIG.shadows.heavy,
        },
      },
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem',
          fontWeight: 600,
          padding: '20px 24px',
        },
      },
    },

    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '20px 24px',
        },
      },
    },

    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
        },
      },
    },

    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiSnackbarContent-root': {
            borderRadius: LAYOUT_CONFIG.borderRadius.medium,
            boxShadow: LAYOUT_CONFIG.shadows.heavy,
          },
        },
      },
    },
  };
};

// ============================================================================
// THEME CREATOR FUNCTION
// ============================================================================
export const createAppTheme = (mode: PaletteMode = 'light') => {
  const palette = mode === 'light' ? lightPalette : darkPalette;

  const themeOptions: ThemeOptions = {
    palette,
    typography,
    components: getComponents(mode),
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

  return createTheme(themeOptions);
};

// Default light theme
const theme = createAppTheme('light');

export default theme;
export type AppTheme = typeof theme;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Responsive utilities
export const responsive = {
  up: (breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl') =>
    `@media (min-width:${theme.breakpoints.values[breakpoint]}px)`,
  down: (breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl') =>
    `@media (max-width:${theme.breakpoints.values[breakpoint] - 0.02}px)`,
  between: (start: 'xs' | 'sm' | 'md' | 'lg' | 'xl', end: 'xs' | 'sm' | 'md' | 'lg' | 'xl') =>
    `@media (min-width:${theme.breakpoints.values[start]}px) and (max-width:${theme.breakpoints.values[end] - 0.02}px)`,
  only: (breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
    const breakpoints = { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 };
    const keys = Object.keys(breakpoints) as Array<keyof typeof breakpoints>;
    const index = keys.indexOf(breakpoint);
    const nextKey = keys[index + 1];

    if (nextKey) {
      return `@media (min-width:${breakpoints[breakpoint]}px) and (max-width:${breakpoints[nextKey] - 0.02}px)`;
    }
    return `@media (min-width:${breakpoints[breakpoint]}px)`;
  },
};

// Color utilities
export const getColorWithOpacity = (color: string, opacity: number) =>
  alpha(color, opacity);

export const getPrimaryColor = (opacity = 1) =>
  getColorWithOpacity(lightPalette.primary.main, opacity);

export const getSecondaryColor = (opacity = 1) =>
  getColorWithOpacity(lightPalette.secondary.main, opacity);

// Educational specific utilities
export const getAttendanceColor = (status: 'present' | 'absent' | 'late' | 'excused') =>
  lightPalette.educational.attendance[status];

export const getGradeColor = (grade: 'excellent' | 'good' | 'average' | 'poor' | 'fail') =>
  lightPalette.educational.grades[grade];

export const getRoleColor = (role: 'admin' | 'teacher' | 'student' | 'parent' | 'staff') =>
  lightPalette.educational.roles[role];

export const getStatusColor = (status: 'active' | 'inactive' | 'pending' | 'suspended') =>
  lightPalette.educational.status[status];

// Shadow utilities
export const getShadow = (level: 'none' | 'light' | 'medium' | 'heavy' | 'colored') =>
  LAYOUT_CONFIG.shadows[level];

// Export palette for direct access
export { lightPalette, darkPalette };