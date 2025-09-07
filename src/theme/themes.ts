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
      background: {
        default: '#f8fafc',
        paper: '#ffffff',
      },
      text: {
        primary: '#272757',
        secondary: '#505081',
      },
      divider: '#8686AC',
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
      background: {
        default: '#f0f9ff',
        paper: '#ffffff',
      },
      text: {
        primary: '#164e63',
        secondary: '#0891b2',
      },
      divider: '#67e8f9',
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
      background: {
        default: '#fff7ed',
        paper: '#ffffff',
      },
      text: {
        primary: '#9a3412',
        secondary: '#ea580c',
      },
      divider: '#fed7aa',
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
      background: {
        default: '#f0fdf4',
        paper: '#ffffff',
      },
      text: {
        primary: '#064e3b',
        secondary: '#059669',
      },
      divider: '#86efac',
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
      background: {
        default: '#faf5ff',
        paper: '#ffffff',
      },
      text: {
        primary: '#4c1d95',
        secondary: '#7c3aed',
      },
      divider: '#c4b5fd',
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
      background: {
        default: '#fffbeb',
        paper: '#ffffff',
      },
      text: {
        primary: '#92400e',
        secondary: '#d97706',
      },
      divider: '#fde68a',
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
      background: {
        default: '#f8fafc',
        paper: '#ffffff',
      },
      text: {
        primary: '#384959',
        secondary: '#6A89A7',
      },
      divider: '#BDDDFC',
    },
  },
  saltAndPepper: {
    name: 'saltAndPepper',
    displayName: 'Salt and Pepper',
    colors: {
      primary: {
        main: '#B3B3B3',     // Medium gray
        light: '#D4D4D4',    // Light gray  
        dark: '#2B2B2B',     // Dark gray/black
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#2B2B2B',     // Dark gray/black
        light: '#B3B3B3',    // Medium gray
        dark: '#000000',     // Pure black
        contrastText: '#ffffff',
      },
      background: {
        default: '#FFFFFF',   // White background
        paper: '#FFFFFF',     // White paper
      },
      text: {
        primary: '#2B2B2B',   // Dark gray for primary text
        secondary: '#B3B3B3', // Medium gray for secondary text
      },
      divider: '#D4D4D4',     // Light gray for dividers
    },
  },
  calmBlue: {
    name: 'calmBlue',
    displayName: 'Calm Blue',
    colors: {
      primary: {
        main: '#57B9FF',     // Bright blue
        light: '#90D5FF',    // Light blue
        dark: '#517891',     // Dark blue-gray
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#77B1D4',     // Medium blue-gray
        light: '#90D5FF',    // Light blue
        dark: '#517891',     // Dark blue-gray
        contrastText: '#ffffff',
      },
      background: {
        default: '#f0f8ff',  // Very light blue background
        paper: '#ffffff',    // White paper
      },
      text: {
        primary: '#517891',  // Dark blue-gray for primary text
        secondary: '#77B1D4', // Medium blue-gray for secondary text
      },
      divider: '#90D5FF',    // Light blue for dividers
    },
  },
  underTheMoonlight: {
    name: 'underTheMoonlight',
    displayName: 'Under the Moonlight',
    colors: {
      primary: {
        main: '#5C5C99',     // Medium purple
        light: '#CCCCFF',    // Light lavender
        dark: '#292966',     // Deep purple
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#A3A3CC',     // Light purple-gray
        light: '#CCCCFF',    // Light lavender
        dark: '#292966',     // Deep purple
        contrastText: '#ffffff',
      },
      background: {
        default: '#f8f6ff',  // Very light purple background
        paper: '#ffffff',    // White paper
      },
      text: {
        primary: '#292966',  // Deep purple for primary text
        secondary: '#5C5C99', // Medium purple for secondary text
      },
      divider: '#CCCCFF',    // Light lavender for dividers
    },
  },
  emeraldOdyssey: {
    name: 'emeraldOdyssey',
    displayName: 'Emerald Odyssey',
    colors: {
      primary: {
        main: '#3EBB9E',     // Turquoise green
        light: '#73E6CB',    // Light turquoise
        dark: '#0A3C30',     // Deep forest green
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#00674F',     // Deep emerald
        light: '#73E6CB',    // Light turquoise
        dark: '#0A3C30',     // Deep forest green
        contrastText: '#ffffff',
      },
      background: {
        default: '#f0fffc',  // Very light mint background
        paper: '#ffffff',    // White paper
      },
      text: {
        primary: '#0A3C30',  // Deep forest green for primary text
        secondary: '#00674F', // Deep emerald for secondary text
      },
      divider: '#73E6CB',    // Light turquoise for dividers
    },
  },
};