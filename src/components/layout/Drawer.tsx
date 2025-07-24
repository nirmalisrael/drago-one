import React from 'react';
import { Drawer, Box, IconButton, useTheme } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuItems from './MenuItems';
import { APP_BAR_DESKTOP_HEIGHT, APP_BAR_MOBILE_HEIGHT, DRAWER_WIDTH } from '@/constants/layout';
import LogoSection from './LogoSection';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import SchoolIcon from '@mui/icons-material/School';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

interface DrawerComponentProps {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({ open, onClose, isMobile }) => {
  const theme = useTheme();

  const menuData = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <DashboardIcon />
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

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.secondary.light, // Set background for the paper part
          display: 'flex',
          flexDirection: 'column', // Use column layout
          borderRight: 'none',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
        },
      }}
    >
      {/* Drawer header with Logo */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between', // Space between the logo and menu icon
          padding: theme.spacing(2),
          backgroundColor: theme.palette.primary.main, // Background color like AppBar
          position: 'relative',
          height: isMobile ? APP_BAR_MOBILE_HEIGHT : APP_BAR_DESKTOP_HEIGHT,
        }}
      >
        {/* Drawer Toggle Icon (ChevronLeft/ChevronRight) */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            left: theme.spacing(1), // Align to the left
            color: 'white',
          }}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        {/* Logo Section */}
        <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', color: 'white' }}>
          {open && <LogoSection />}
        </Box>
      </Box>

      {/* Scrollable Menu Items */}
      <Box
        sx={{
          flex: 1, // Allow the menu to take up the remaining space
          overflowY: 'auto', // Enable scrolling of the menu items
          // borderRight: `1px solid ${useTheme().palette.divider}`,
        }}
      >
        <MenuItems menuData={menuData} />
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
