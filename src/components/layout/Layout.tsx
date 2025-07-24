import React, { type ReactNode } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import AppBarComponent from './AppBar';
import DrawerComponent from './Drawer';
import { APP_BAR_DESKTOP_HEIGHT, APP_BAR_MOBILE_HEIGHT, DRAWER_WIDTH } from '@/constants/layout';

// Define props interface
interface LayoutProps {
  children: ReactNode; // Explicitly type children
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(!isMobile);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBarComponent open={open} onDrawerToggle={handleDrawerToggle} isMobile={isMobile} />
      <DrawerComponent open={open} onClose={handleDrawerToggle} isMobile={isMobile} />
      <Box sx={{ display: 'flex' }}> {/* Fixing height to 100vh */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: '100%',
            backgroundColor: theme.palette.background.default,
            height: `calc(100vh - ${isMobile ? APP_BAR_MOBILE_HEIGHT : APP_BAR_DESKTOP_HEIGHT}px)`, // Fix height of the main content
            marginTop: isMobile ? `${APP_BAR_MOBILE_HEIGHT}px` : `${APP_BAR_DESKTOP_HEIGHT}px`,
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            ...(open && {
              width: isMobile ? '100%' : `calc(100% - ${DRAWER_WIDTH}px)`, // Drawer width adjustment
              marginLeft: isMobile ? 0 : `${DRAWER_WIDTH}px`, // Adjust margin when drawer is open
              transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }),
          }}
        >
          {/* <Box sx={(theme) => theme.mixins.toolbar} /> */}
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
