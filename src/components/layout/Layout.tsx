// Layout.tsx - Enhanced Version with Fixed Body Session
import React, { useState, useEffect, type ReactNode } from 'react';
import { Box, useTheme, useMediaQuery, alpha } from '@mui/material';
import {
  APP_BAR_DESKTOP_HEIGHT,
  APP_BAR_MOBILE_HEIGHT,
  COLLAPSED_DRAWER_WIDTH,
  DRAWER_WIDTH
} from '@/constants/layout';
import AppBarComponent from './AppBar/AppBar';
import DrawerComponent from './Drawer/Drawer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [drawerCollapsed, setDrawerCollapsed] = useState(false);

  // Reset drawer state on mobile/desktop transition
  useEffect(() => {
    if (isMobile) {
      setDrawerOpen(false);
      setDrawerCollapsed(false);
    } else {
      setDrawerOpen(true);
    }
  }, [isMobile]);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setDrawerOpen(!drawerOpen);
    } else if (!drawerOpen) {
      // Desktop behavior: toggle collapse when drawer is open, open when closed
      setDrawerOpen(true);
      setDrawerCollapsed(false);
    } else {
      setDrawerCollapsed(!drawerCollapsed);
    }
  };

  const handleDrawerClose = () => {
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleToggleCollapse = () => {
    setDrawerCollapsed(!drawerCollapsed);
  };

  // Calculate main content width
  const getMainContentWidth = (): string => {
    if (isMobile) return '100%';
    if (!drawerOpen) return '100%';
    const drawerWidth = drawerCollapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH;
    return `calc(100% - ${drawerWidth}px)`;
  };

  const appBarHeight = isMobile ? APP_BAR_MOBILE_HEIGHT : APP_BAR_DESKTOP_HEIGHT;

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background: `linear-gradient(135deg, 
          ${theme.palette.background.default} 0%, 
          ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
      }}
    >
      {/* AppBar */}
      <AppBarComponent
        collapsed={drawerCollapsed}
        isMobile={isMobile}
        // open={drawerOpen}
        onDrawerToggle={handleDrawerToggle}
        onToggleCollapse={handleToggleCollapse}
      // getMainContentMarginLeft={getMainContentMarginLeft}
      />

      {/* Drawer */}
      <DrawerComponent
        open={drawerOpen}
        onClose={handleDrawerClose}
        isMobile={isMobile}
        collapsed={drawerCollapsed}
      />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: isMobile ? '100%' : getMainContentWidth(),
          // marginLeft: isMobile ? 0 : `${getMainContentMarginLeft()}px`,
          marginTop: `${appBarHeight}px`,
          height: `calc(100vh - ${appBarHeight}px)`,
          position: 'relative',
          overflow: 'hidden',
          transition: theme.transitions.create(['margin-left', 'width'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
          }),
          flexGrow: isMobile ? 0 : 1,
        }}
      >
        {/* Content Container with Proper Scrolling */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            padding: theme.spacing(3),
            position: 'relative',
            // Enhanced Background
            background: `linear-gradient(135deg, 
              ${alpha(theme.palette.background.paper, 0.8)} 0%, 
              ${alpha(theme.palette.background.default, 0.9)} 100%)`,
            backdropFilter: 'blur(10px)',
            // Custom Scrollbar
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: alpha(theme.palette.divider, 0.1),
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: alpha(theme.palette.primary.main, 0.3),
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.5),
              },
            },
            // Content fade-in animation
            animation: 'fadeIn 0.3s ease-in-out',
            '@keyframes fadeIn': {
              '0%': {
                opacity: 0,
                transform: 'translateY(10px)',
              },
              '100%': {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          {/* Content */}
          {children}
        </Box>

        {/* Bottom Fade Effect */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '20px',
            background: `linear-gradient(to top, 
              ${alpha(theme.palette.background.default, 1)} 0%, 
              transparent 100%)`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      </Box>

      {/* Mobile Overlay when drawer is open */}
      {isMobile && drawerOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: alpha(theme.palette.common.black, 0.5),
            backdropFilter: 'blur(4px)',
            zIndex: theme.zIndex.drawer - 1,
            transition: theme.transitions.create('opacity', {
              duration: theme.transitions.duration.standard,
            }),
          }}
          onClick={handleDrawerClose}
        />
      )}
    </Box>
  );
};

export default Layout;