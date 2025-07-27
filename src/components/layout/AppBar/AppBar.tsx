// AppBarComponent.tsx - Enhanced Version with Drawer Controls
import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  styled,
  alpha,
  InputBase,
  useTheme,
  Badge,
  Avatar,
  Typography,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { APP_BAR_DESKTOP_HEIGHT, APP_BAR_MOBILE_HEIGHT } from '@/constants/layout';
import LogoSection from '../Drawer/LogoSection';
import MobileMenu from './MobileMenu';

// Enhanced Search Component with Glassmorphism
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.common.white, 0.15)} 0%, 
    ${alpha(theme.palette.common.white, 0.10)} 100%)`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  '&:hover': {
    background: `linear-gradient(135deg, 
      ${alpha(theme.palette.common.white, 0.25)} 0%, 
      ${alpha(theme.palette.common.white, 0.15)} 100%)`,
    transform: 'translateY(-1px)',
    boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
  },
  '&:focus-within': {
    background: `linear-gradient(135deg, 
      ${alpha(theme.palette.common.white, 0.3)} 0%, 
      ${alpha(theme.palette.common.white, 0.2)} 100%)`,
    transform: 'translateY(-1px)',
    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(1),
  minWidth: '200px',
  maxWidth: '400px',
  transition: theme.transitions.create(['background', 'transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: alpha(theme.palette.common.white, 0.8),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.common.white,
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 1.2, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '0.875rem',
    fontWeight: 500,
    '&::placeholder': {
      color: alpha(theme.palette.common.white, 0.7),
      opacity: 1,
    },
    [theme.breakpoints.up('md')]: {
      width: '25ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

// Enhanced Action Button
const ActionButton = styled(IconButton)(({ theme }) => ({
  width: 44,
  height: 44,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.common.white, 0.15)}`,
  color: theme.palette.common.white,
  margin: theme.spacing(0, 0.5),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.15)}`,
  },
  transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
}));

// Special Toggle Button for Desktop Drawer
const ToggleButton = styled(IconButton)(({ theme }) => ({
  width: 44,
  height: 44,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
    transform: 'scale(1.1)',
    boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.3)}`,
  },
  transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
}));

interface AppBarComponentProps {
  collapsed: boolean;
  isMobile: boolean;
  open: boolean;
  onDrawerToggle: () => void;
  onToggleCollapse?: () => void;
  getMainContentMarginLeft: () => number;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({
  collapsed,
  onDrawerToggle,
  onToggleCollapse,
  isMobile,
  open,
  getMainContentMarginLeft
}) => {
  const theme = useTheme();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isMenuOpen = Boolean(anchorEl);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        // width: isMobile ? '100%' : `calc(100% - ${getMainContentMarginLeft()}px)`,
        // ml: isMobile ? 0 : `${getMainContentMarginLeft()}px`,
        height: isMobile ? APP_BAR_MOBILE_HEIGHT : APP_BAR_DESKTOP_HEIGHT,
        zIndex: theme.zIndex.drawer + 1,
        // Enhanced Glassmorphism Background
        background: `linear-gradient(135deg, 
          ${theme.palette.primary.main} 0%, 
          ${theme.palette.primary.dark} 50%,
          ${alpha(theme.palette.primary.main, 0.9)} 100%)`,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${alpha(theme.palette.primary.contrastText, 0.1)}`,
        transition: theme.transitions.create(['width', 'margin-left'], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.standard,
        }),
        // Add subtle shadow
        boxShadow: `0 2px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
        // Glass effect overlay
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, 
            ${alpha('#ffffff', 0.1)} 0%, 
            transparent 50%, 
            ${alpha('#000000', 0.05)} 100%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Toolbar
        sx={{
          height: '100%',
          minHeight: 'auto !important',
          px: { xs: 2, sm: 3 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Mobile Menu Button */}
        {isMobile && (
          <ActionButton
            edge="start"
            aria-label="toggle drawer"
            onClick={onDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </ActionButton>
        )}

        {/* Desktop Drawer Toggle Button */}
        {!isMobile && (
          <ToggleButton
            onClick={onToggleCollapse}
            aria-label="toggle drawer"
            sx={{
              mr: 2,
            }}
          >
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </ToggleButton>
        )}

        {/* Logo Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mr: 3,
            opacity: 1,
            transition: theme.transitions.create(['opacity'], {
              duration: theme.transitions.duration.standard,
              easing: theme.transitions.easing.easeInOut,
            }),
          }}
        >
          <LogoSection variant="appbar" />
        </Box>

        {/* Divider between controls and search (desktop only) */}
        {!isMobile && (
          <Box
            sx={{
              height: 32,
              width: 1,
              backgroundColor: alpha(theme.palette.primary.contrastText, 0.2),
              mr: 2,
              borderRadius: 0.5,
            }}
          />
        )}

        {/* Search Bar */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search anything..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        {/* Spacer */}
        {/* <Box sx={{ flexGrow: 1 }} /> */}

        {/* Desktop Actions */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
          <ActionButton aria-label="show new mails">
            <Badge
              badgeContent={4}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: theme.palette.error.main,
                  color: theme.palette.error.contrastText,
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }
              }}
            >
              <MailIcon />
            </Badge>
          </ActionButton>

          <ActionButton aria-label="show new notifications">
            <Badge
              badgeContent={17}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: theme.palette.error.main,
                  color: theme.palette.error.contrastText,
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }
              }}
            >
              <NotificationsIcon />
            </Badge>
          </ActionButton>

          {/* Profile Section - Enhanced */}
          <Box
            onClick={handleProfileMenuOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              padding: theme.spacing(0.5, 1.5),
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.common.white, 0.1),
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.common.white, 0.15)}`,
              cursor: 'pointer',
              transition: theme.transitions.create(['background-color', 'transform'], {
                duration: theme.transitions.duration.short,
              }),
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.2),
                transform: 'translateY(-1px)',
              },
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                backgroundColor: theme.palette.secondary.main,
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              JD
            </Avatar>
            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.common.white,
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                John Doe
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: alpha(theme.palette.common.white, 0.7),
                  lineHeight: 1,
                }}
              >
                Administrator
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Mobile More Button */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <ActionButton
            aria-label="show more"
            aria-controls="mobile-menu"
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
          >
            <MoreIcon />
          </ActionButton>
        </Box>
      </Toolbar>

      {/* Mobile Menu */}
      <MobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        anchorEl={anchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
        handleMenuClose={handleMenuClose}
        isMenuOpen={isMenuOpen}
      />
    </AppBar>
  );
};

export default AppBarComponent;