import type { ThemeConfig } from './types';

export const themes: Record<string, ThemeConfig> = {
  blueEclipse: {
    name: 'blueEclipse',
    displayName: 'Blue Eclipse',
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
      background: {
        default: '#f8fafc',
        paper: '#ffffff',
        elevated: '#f1f5f9',
      },
      text: {
        primary: '#272757',
        secondary: '#505081',
        disabled: '#8686AC',
      },
      divider: '#e2e8f0',
      action: {
        hover: '#f1f5f9',
        selected: '#e0e7ff',
        disabled: '#f8fafc',
      },
      focus: '#8686AC',
      surface: {
        low: '#ffffff',
        medium: '#f8fafc',
        high: '#f1f5f9',
      }
    },
  },

  ocean: {
    name: 'ocean',
    displayName: 'Ocean Breeze',
    colors: {
      primary: {
        main: '#0891b2',
        light: '#67e8f9',
        dark: '#155e75',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#0e7490',
        light: '#22d3ee',
        dark: '#164e63',
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
        main: '#0891b2',
        light: '#67e8f9',
        dark: '#155e75',
        contrastText: '#ffffff',
      },
      background: {
        default: '#f0f9ff',
        paper: '#ffffff',
        elevated: '#e0f7fa',
      },
      text: {
        primary: '#164e63',
        secondary: '#0891b2',
        disabled: '#67e8f9',
      },
      divider: '#b3e5fc',
      action: {
        hover: '#e0f7fa',
        selected: '#b3e5fc',
        disabled: '#f0f9ff',
      },
      focus: '#0891b2',
      surface: {
        low: '#ffffff',
        medium: '#f0f9ff',
        high: '#e0f7fa',
      }
    },
  },

  sunset: {
    name: 'sunset',
    displayName: 'Sunset Glow',
    colors: {
      primary: {
        main: '#ea580c',
        light: '#fed7aa',
        dark: '#9a3412',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#dc2626',
        light: '#fca5a5',
        dark: '#991b1b',
        contrastText: '#ffffff',
      },
      success: {
        main: '#16a34a',
        light: '#22c55e',
        dark: '#15803d',
        contrastText: '#ffffff',
      },
      error: {
        main: '#dc2626',
        light: '#fca5a5',
        dark: '#991b1b',
        contrastText: '#ffffff',
      },
      warning: {
        main: '#ea580c',
        light: '#fed7aa',
        dark: '#9a3412',
        contrastText: '#ffffff',
      },
      info: {
        main: '#0ea5e9',
        light: '#38bdf8',
        dark: '#0284c7',
        contrastText: '#ffffff',
      },
      background: {
        default: '#fff7ed',
        paper: '#ffffff',
        elevated: '#fef3e2',
      },
      text: {
        primary: '#9a3412',
        secondary: '#ea580c',
        disabled: '#fed7aa',
      },
      divider: '#fed7aa',
      action: {
        hover: '#fef3e2',
        selected: '#fed7aa',
        disabled: '#fff7ed',
      },
      focus: '#ea580c',
      surface: {
        low: '#ffffff',
        medium: '#fff7ed',
        high: '#fef3e2',
      }
    },
  },

  forest: {
    name: 'forest',
    displayName: 'Forest Green',
    colors: {
      primary: {
        main: '#059669',
        light: '#86efac',
        dark: '#064e3b',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#047857',
        light: '#6ee7b7',
        dark: '#065f46',
        contrastText: '#ffffff',
      },
      success: {
        main: '#059669',
        light: '#86efac',
        dark: '#064e3b',
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
      background: {
        default: '#f0fdf4',
        paper: '#ffffff',
        elevated: '#ecfdf5',
      },
      text: {
        primary: '#064e3b',
        secondary: '#059669',
        disabled: '#86efac',
      },
      divider: '#86efac',
      action: {
        hover: '#ecfdf5',
        selected: '#d1fae5',
        disabled: '#f0fdf4',
      },
      focus: '#059669',
      surface: {
        low: '#ffffff',
        medium: '#f0fdf4',
        high: '#ecfdf5',
      }
    },
  },

  midnight: {
    name: 'midnight',
    displayName: 'Midnight Purple',
    colors: {
      primary: {
        main: '#7c3aed',
        light: '#c4b5fd',
        dark: '#4c1d95',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#6366f1',
        light: '#a5b4fc',
        dark: '#3730a3',
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
        main: '#6366f1',
        light: '#a5b4fc',
        dark: '#3730a3',
        contrastText: '#ffffff',
      },
      background: {
        default: '#faf5ff',
        paper: '#ffffff',
        elevated: '#f3e8ff',
      },
      text: {
        primary: '#4c1d95',
        secondary: '#7c3aed',
        disabled: '#c4b5fd',
      },
      divider: '#c4b5fd',
      action: {
        hover: '#f3e8ff',
        selected: '#e9d5ff',
        disabled: '#faf5ff',
      },
      focus: '#7c3aed',
      surface: {
        low: '#ffffff',
        medium: '#faf5ff',
        high: '#f3e8ff',
      }
    },
  },

  royal: {
    name: 'royal',
    displayName: 'Royal Gold',
    colors: {
      primary: {
        main: '#d97706',
        light: '#fde68a',
        dark: '#92400e',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#b45309',
        light: '#fbbf24',
        dark: '#78350f',
        contrastText: '#ffffff',
      },
      success: {
        main: '#16a34a',
        light: '#22c55e',
        dark: '#15803d',
        contrastText: '#ffffff',
      },
      error: {
        main: '#ef4444',
        light: '#f87171',
        dark: '#dc2626',
        contrastText: '#ffffff',
      },
      warning: {
        main: '#d97706',
        light: '#fde68a',
        dark: '#92400e',
        contrastText: '#ffffff',
      },
      info: {
        main: '#0ea5e9',
        light: '#38bdf8',
        dark: '#0284c7',
        contrastText: '#ffffff',
      },
      background: {
        default: '#fffbeb',
        paper: '#ffffff',
        elevated: '#fef3c7',
      },
      text: {
        primary: '#92400e',
        secondary: '#d97706',
        disabled: '#fde68a',
      },
      divider: '#fde68a',
      action: {
        hover: '#fef3c7',
        selected: '#fde68a',
        disabled: '#fffbeb',
      },
      focus: '#d97706',
      surface: {
        low: '#ffffff',
        medium: '#fffbeb',
        high: '#fef3c7',
      }
    },
  },

  stormyMorning: {
    name: 'stormyMorning',
    displayName: 'Stormy Morning',
    colors: {
      primary: {
        main: '#6A89A7',
        light: '#BDDDFC',
        dark: '#384959',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#88BDF2',
        light: '#BDDDFC',
        dark: '#6A89A7',
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
        main: '#88BDF2',
        light: '#BDDDFC',
        dark: '#6A89A7',
        contrastText: '#ffffff',
      },
      background: {
        default: '#f8fafc',
        paper: '#ffffff',
        elevated: '#f1f5f9',
      },
      text: {
        primary: '#384959',
        secondary: '#6A89A7',
        disabled: '#BDDDFC',
      },
      divider: '#BDDDFC',
      action: {
        hover: '#f1f5f9',
        selected: '#e0f2fe',
        disabled: '#f8fafc',
      },
      focus: '#6A89A7',
      surface: {
        low: '#ffffff',
        medium: '#f8fafc',
        high: '#f1f5f9',
      }
    },
  },

  saltAndPepper: {
    name: 'saltAndPepper',
    displayName: 'Salt and Pepper',
    colors: {
      primary: {
        main: '#B3B3B3',
        light: '#D4D4D4',
        dark: '#2B2B2B',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#2B2B2B',
        light: '#B3B3B3',
        dark: '#000000',
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
        main: '#B3B3B3',
        light: '#D4D4D4',
        dark: '#2B2B2B',
        contrastText: '#ffffff',
      },
      background: {
        default: '#FFFFFF',
        paper: '#FFFFFF',
        elevated: '#F8F8F8',
      },
      text: {
        primary: '#2B2B2B',
        secondary: '#B3B3B3',
        disabled: '#D4D4D4',
      },
      divider: '#D4D4D4',
      action: {
        hover: '#F8F8F8',
        selected: '#F0F0F0',
        disabled: '#FFFFFF',
      },
      focus: '#B3B3B3',
      surface: {
        low: '#FFFFFF',
        medium: '#FFFFFF',
        high: '#F8F8F8',
      }
    },
  },

  calmBlue: {
    name: 'calmBlue',
    displayName: 'Calm Blue',
    colors: {
      primary: {
        main: '#57B9FF',
        light: '#90D5FF',
        dark: '#517891',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#77B1D4',
        light: '#90D5FF',
        dark: '#517891',
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
        main: '#57B9FF',
        light: '#90D5FF',
        dark: '#517891',
        contrastText: '#ffffff',
      },
      background: {
        default: '#f0f8ff',
        paper: '#ffffff',
        elevated: '#e6f3ff',
      },
      text: {
        primary: '#517891',
        secondary: '#77B1D4',
        disabled: '#90D5FF',
      },
      divider: '#90D5FF',
      action: {
        hover: '#e6f3ff',
        selected: '#dbeafe',
        disabled: '#f0f8ff',
      },
      focus: '#57B9FF',
      surface: {
        low: '#ffffff',
        medium: '#f0f8ff',
        high: '#e6f3ff',
      }
    },
  },

  underTheMoonlight: {
    name: 'underTheMoonlight',
    displayName: 'Under the Moonlight',
    colors: {
      primary: {
        main: '#5C5C99',
        light: '#CCCCFF',
        dark: '#292966',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#A3A3CC',
        light: '#CCCCFF',
        dark: '#292966',
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
        main: '#5C5C99',
        light: '#CCCCFF',
        dark: '#292966',
        contrastText: '#ffffff',
      },
      background: {
        default: '#f8f6ff',
        paper: '#ffffff',
        elevated: '#f3f0ff',
      },
      text: {
        primary: '#292966',
        secondary: '#5C5C99',
        disabled: '#CCCCFF',
      },
      divider: '#CCCCFF',
      action: {
        hover: '#f3f0ff',
        selected: '#ede9fe',
        disabled: '#f8f6ff',
      },
      focus: '#5C5C99',
      surface: {
        low: '#ffffff',
        medium: '#f8f6ff',
        high: '#f3f0ff',
      }
    },
  },

  emeraldOdyssey: {
    name: 'emeraldOdyssey',
    displayName: 'Emerald Odyssey',
    colors: {
      primary: {
        main: '#3EBB9E',
        light: '#73E6CB',
        dark: '#0A3C30',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#00674F',
        light: '#73E6CB',
        dark: '#0A3C30',
        contrastText: '#ffffff',
      },
      success: {
        main: '#3EBB9E',
        light: '#73E6CB',
        dark: '#0A3C30',
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
        main: '#00674F',
        light: '#73E6CB',
        dark: '#0A3C30',
        contrastText: '#ffffff',
      },
      background: {
        default: '#f0fffc',
        paper: '#ffffff',
        elevated: '#ecfdf9',
      },
      text: {
        primary: '#0A3C30',
        secondary: '#00674F',
        disabled: '#73E6CB',
      },
      divider: '#73E6CB',
      action: {
        hover: '#ecfdf9',
        selected: '#d1fae5',
        disabled: '#f0fffc',
      },
      focus: '#3EBB9E',
      surface: {
        low: '#ffffff',
        medium: '#f0fffc',
        high: '#ecfdf9',
      }
    },
  },

  academicBlue: {
    name: 'academicBlue',
    displayName: 'Academic Excellence',
    colors: {
      primary: {
        main: '#1e3a8a',
        light: '#3b82f6',
        dark: '#1e40af',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#f59e0b',
        light: '#fbbf24',
        dark: '#d97706',
        contrastText: '#1f2937',
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
      background: {
        default: '#f8fafc',
        paper: '#ffffff',
        elevated: '#f1f5f9',
      },
      text: {
        primary: '#0f172a',
        secondary: '#475569',
        disabled: '#94a3b8',
      },
      divider: '#e2e8f0',
      action: {
        hover: '#f1f5f9',
        selected: '#e0f2fe',
        disabled: '#f8fafc',
      },
      focus: '#3b82f6',
      surface: {
        low: '#ffffff',
        medium: '#f8fafc',
        high: '#f1f5f9',
      }
    },
  },

  modernTeal: {
    name: 'modernTeal',
    displayName: 'Modern Education',
    colors: {
      primary: {
        main: '#0d9488',
        light: '#14b8a6',
        dark: '#0f766e',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#7c3aed',
        light: '#8b5cf6',
        dark: '#6d28d9',
        contrastText: '#ffffff',
      },
      success: {
        main: '#16a34a',
        light: '#22c55e',
        dark: '#15803d',
        contrastText: '#ffffff',
      },
      error: {
        main: '#e11d48',
        light: '#f43f5e',
        dark: '#be123c',
        contrastText: '#ffffff',
      },
      warning: {
        main: '#ea580c',
        light: '#fb923c',
        dark: '#c2410c',
        contrastText: '#ffffff',
      },
      info: {
        main: '#0891b2',
        light: '#06b6d4',
        dark: '#0e7490',
        contrastText: '#ffffff',
      },
      background: {
        default: '#fafafa',
        paper: '#ffffff',
        elevated: '#f4f4f5',
      },
      text: {
        primary: '#111827',
        secondary: '#6b7280',
        disabled: '#9ca3af',
      },
      divider: '#e5e7eb',
      action: {
        hover: '#f3f4f6',
        selected: '#ecfdf5',
        disabled: '#f9fafb',
      },
      focus: '#14b8a6',
      surface: {
        low: '#ffffff',
        medium: '#fafafa',
        high: '#f3f4f6',
      }
    },
  },

  warmAcademia: {
    name: 'warmAcademia',
    displayName: 'Warm Academia',
    colors: {
      primary: {
        main: '#b45309',
        light: '#d97706',
        dark: '#92400e',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#1f2937',
        light: '#4b5563',
        dark: '#111827',
        contrastText: '#ffffff',
      },
      success: {
        main: '#16a34a',
        light: '#22c55e',
        dark: '#15803d',
        contrastText: '#ffffff',
      },
      error: {
        main: '#dc2626',
        light: '#ef4444',
        dark: '#b91c1c',
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
      background: {
        default: '#fefefe',
        paper: '#ffffff',
        elevated: '#f9fafb',
      },
      text: {
        primary: '#1f2937',
        secondary: '#6b7280',
        disabled: '#9ca3af',
      },
      divider: '#e5e7eb',
      action: {
        hover: '#f9fafb',
        selected: '#fef3c7',
        disabled: '#fefefe',
      },
      focus: '#d97706',
      surface: {
        low: '#ffffff',
        medium: '#fefefe',
        high: '#f9fafb',
      }
    },
  },

  professionalDark: {
    name: 'professionalDark',
    displayName: 'Professional Dark',
    colors: {
      primary: {
        main: '#3b82f6',
        light: '#60a5fa',
        dark: '#2563eb',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#8b5cf6',
        light: '#a78bfa',
        dark: '#7c3aed',
        contrastText: '#ffffff',
      },
      success: {
        main: '#10b981',
        light: '#34d399',
        dark: '#059669',
        contrastText: '#ffffff',
      },
      error: {
        main: '#f87171',
        light: '#fca5a5',
        dark: '#ef4444',
        contrastText: '#ffffff',
      },
      warning: {
        main: '#fbbf24',
        light: '#fde047',
        dark: '#f59e0b',
        contrastText: '#1f2937',
      },
      info: {
        main: '#38bdf8',
        light: '#7dd3fc',
        dark: '#0ea5e9',
        contrastText: '#ffffff',
      },
      background: {
        default: '#0f172a',
        paper: '#1e293b',
        elevated: '#334155',
      },
      text: {
        primary: '#f8fafc',
        secondary: '#cbd5e1',
        disabled: '#64748b',
      },
      divider: '#334155',
      action: {
        hover: '#1e293b',
        selected: '#1e3a8a',
        disabled: '#0f172a',
      },
      focus: '#3b82f6',
      surface: {
        low: '#1e293b',
        medium: '#0f172a',
        high: '#334155',
      }
    },
  },
};