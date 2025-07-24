import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0869a1ff',
    },
    secondary: {
      main: '#2994d6ff',
      light: '#c8eaffff',
    },
    error: {
      main: '#f50057',
    },
    background: {
      default: '#f4f6f8', // Light background color for the body
      paper: '#ffffff',   // Background for paper/card components
    },
    text: {
      primary: '#000000', // Primary text color (usually black)
      secondary: '#555555', // Secondary text color (usually dark gray)
    },
  },
  typography: {
    button: {
      textTransform: 'none', // Disable uppercase transformation for all button text
    },
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '2rem', // Customize h1 typography
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem', // Customize body text
    },
  },
  spacing: 8, // You can adjust the spacing globally (default is 8px)
  shape: {
    borderRadius: 3, // Global border radius
  },
  breakpoints: {
    values: {
      xs: 0,  // Extra small screens
      sm: 600, // Small screens
      md: 900, // Medium screens
      lg: 1200, // Large screens
      xl: 1536, // Extra large screens
    },
  },
  transitions: {
    duration: {
      standard: 300, // Adjust duration globally
    },
    easing: {
      easeOut: 'cubic-bezier(0.25, 0.8, 0.25, 1)', // Custom easing function
    },
  },
  // overrides: {
  //   // You can customize global styles for specific components here
  //   MuiButton: {
  //     root: {
  //       textTransform: 'none', // Disable uppercase text on all buttons
  //     },
  //   },
  // },
  components: {
    // Customize other components globally (e.g., AppBar, Drawer, etc.)
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'primary.main', // Change AppBar color
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffffff', // Change Drawer background color
          color: 'primary.main', // Change text color
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          // WebKit browsers (Chrome, Safari)
          '&::-webkit-scrollbar': {
            width: '12px', // Width of the scrollbar
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1', // Track color
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888', // Thumb color
            borderRadius: '10px', // Rounded thumb
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555', // Thumb hover color
          },

          // Firefox (needs specific properties)
          scrollbarWidth: 'thin', // Thinner scrollbar in Firefox
          scrollbarColor: '#888 #f1f1f1', // Thumb and track color in Firefox
        },
      },
    },
  },
});

export default theme;
