// DrawerComponent.tsx - Menu Only Version with Enhanced Logo Support
import React from 'react';
import { Drawer, Box, useTheme, alpha } from '@mui/material';
import { DRAWER_WIDTH, COLLAPSED_DRAWER_WIDTH } from '@/constants/layout';
import WidgetsIcon from '@mui/icons-material/Widgets';
import InventoryIcon from '@mui/icons-material/Inventory';
import SchoolIcon from '@mui/icons-material/School';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import UnifiedMenuItems from './MenuItems/UnifiedMenuItems';

interface DrawerComponentProps {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
  collapsed?: boolean;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  open,
  onClose,
  isMobile,
  collapsed = false
}) => {
  const theme = useTheme();

  const menuData = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <WidgetsIcon />
    },
    {
      label: 'Projects',
      icon: <InventoryIcon />,
      subItems: [
        { label: 'Project List', path: '/projects' },
        { label: 'Add New Project', path: '/projects/new' },
        { label: 'Project Milestones', path: '/projects/milestones' }
      ]
    },
    {
      label: 'Students',
      icon: <SchoolIcon />,
      subItems: [
        { label: 'All Students', path: '/students' },
        { label: 'Add Student', path: '/students/new' },
        { label: 'Student Attendance', path: '/students/attendance' },
        { label: 'Student Results', path: '/students/results' }
      ]
    },
    {
      label: 'Online Elections',
      icon: <HowToVoteIcon />,
      subItems: [
        { label: 'Candidates', path: '/elections/candidates' },
        { label: 'Voting Process', path: '/elections/voting' },
        { label: 'Results', path: '/elections/results' }
      ]
    },
    {
      label: 'Courses',
      icon: <LibraryBooksIcon />,
      subItems: [
        { label: 'All Courses', path: '/courses' },
        { label: 'Add Course', path: '/courses/new' },
        { label: 'Course Catalog', path: '/courses/catalog' }
      ]
    },
    {
      label: 'Semester & Year',
      icon: <EventNoteIcon />,
      subItems: [
        { label: 'Current Semester', path: '/semester/current' },
        { label: 'Past Semesters', path: '/semester/past' },
        { label: 'Academic Calendar', path: '/semester/calendar' }
      ]
    },
    {
      label: 'Faculties',
      icon: <GroupWorkIcon />,
      subItems: [
        { label: 'All Faculties', path: '/faculties' },
        { label: 'Add Faculty', path: '/faculties/new' },
        { label: 'Faculty Details', path: '/faculties/details' }
      ]
    },
    {
      label: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings'
    },
    {
      label: 'Logout',
      icon: <ExitToAppIcon />,
      path: '/logout'
    }
  ];

  const drawerWidth = collapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH;

  // Enhanced glassmorphism background using theme colors
  const glassmorphismBackground = {
    background: `linear-gradient(135deg, 
      ${alpha(theme.palette.background.paper, 0.98)} 0%, 
      ${alpha(theme.palette.background.default, 0.95)} 100%)`,
    backdropFilter: 'blur(20px)',
    borderRight: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(135deg, 
        ${alpha(theme.palette.primary.main, 0.03)} 0%, 
        transparent 50%, 
        ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
      pointerEvents: 'none',
    },
  };

  return (
    <Box
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.standard,
        }),
        ...(isMobile && !open && {
          width: 0,
        }),
        position: 'relative',
      }}
    >
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          height: `calc(100vh - ${isMobile ? '56px' : '64px'})`,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            ...glassmorphismBackground,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative',
            // Position drawer below AppBar
            top: isMobile ? '56px' : '64px',
            height: `calc(100vh - ${isMobile ? '56px' : '64px'})`,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.standard,
            }),
            boxShadow: `4px 0 24px ${alpha(theme.palette.common.black, 0.12)}`,
            borderRight: 'none',
            pt: 0,
            mt: 0,
          },
        }}
      >
        {/* Menu Items Container - Now takes full height */}
        <Box
          sx={{
            flex: 1,
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            position: 'relative',
            // Add top padding to account for AppBar
            pt: 1,
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: alpha(theme.palette.divider, 0.1),
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: alpha(theme.palette.primary.main, 0.3),
              borderRadius: '3px',
              '&:hover': {
                background: alpha(theme.palette.primary.main, 0.5),
              },
            },
          }}
        >
          <UnifiedMenuItems menuData={menuData} collapsed={collapsed && !isMobile} />
        </Box>

        {/* Bottom Gradient Fade */}
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            left: 0,
            right: 0,
            height: '20px',
            background: `linear-gradient(to top, 
              ${alpha(theme.palette.background.paper, 1)} 0%, 
              transparent 100%)`,
            pointerEvents: 'none',
          }}
        />
      </Drawer>
    </Box>
  );
};

export default DrawerComponent;