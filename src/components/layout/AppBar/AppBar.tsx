// AppBarComponent.tsx - Enhanced Version with Dynamic Theme Support
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
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { APP_BAR_DESKTOP_HEIGHT, APP_BAR_MOBILE_HEIGHT } from '@/constants/layout';
import LogoSection from '../Drawer/LogoSection';
import MobileMenu from './MobileMenu';

// Enhanced Search Component with better theme support
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.background.paper, 0.15),
  border: `1px solid ${alpha(theme.palette.primary.contrastText, 0.2)}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.paper, 0.25),
    transform: 'translateY(-1px)',
    boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.1)}`,
  },
  '&:focus-within': {
    backgroundColor: alpha(theme.palette.background.paper, 0.3),
    borderColor: alpha(theme.palette.primary.contrastText, 0.4),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(1),
  minWidth: '200px',
  maxWidth: '400px',
  transition: theme.transitions.create(['background-color', 'transform', 'box-shadow', 'border-color'], {
    duration: theme.transitions.duration.short,
  }),
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
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
  color: alpha(theme.palette.primary.contrastText, 0.7),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '0.875rem',
    fontWeight: 500,
    '&::placeholder': {
      color: alpha(theme.palette.primary.contrastText, 0.6),
      opacity: 1,
    },
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}));

// Enhanced Action Button with better theme support
const ActionButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: alpha(theme.palette.primary.contrastText, 0.1),
  color: theme.palette.primary.contrastText,
  margin: theme.spacing(0, 0.5),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.contrastText, 0.2),
    transform: 'translateY(-1px)',
  },
  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.short,
  }),
}));

// Toggle Button for Desktop Drawer
const ToggleButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: alpha(theme.palette.primary.contrastText, 0.1),
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.contrastText, 0.2),
    transform: 'scale(1.05)',
  },
  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.short,
  }),
}));

interface AppBarComponentProps {
  collapsed: boolean;
  isMobile: boolean;
  onDrawerToggle: () => void;
  onToggleCollapse?: () => void;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({
  collapsed,
  onDrawerToggle,
  onToggleCollapse,
  isMobile
}) => {
  const theme = useTheme();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  console.log(collapsed);

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
        height: isMobile ? APP_BAR_MOBILE_HEIGHT : APP_BAR_DESKTOP_HEIGHT,
        zIndex: theme.zIndex.drawer + 1,
        // Use clean primary color background
        backgroundColor: theme.palette.primary.main,
        // Subtle shadow for depth
        boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.1)}`,
        // Border for definition
        borderBottom: `1px solid ${alpha(theme.palette.primary.contrastText, 0.1)}`,
        transition: theme.transitions.create(['width', 'margin-left'], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.standard,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: '100%',
          minHeight: 'auto !important',
          px: { xs: 2, sm: 2 },
        }}
      >
        {/* Mobile Menu Button */}
        {isMobile && (
          <ToggleButton
            edge="start"
            aria-label="toggle drawer"
            onClick={onDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </ToggleButton>
        )}

        {/* Desktop Drawer Toggle Button */}
        {!isMobile && (
          <ToggleButton
            onClick={onToggleCollapse}
            aria-label="toggle drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </ToggleButton>
        )}


        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mr: 2,
            transition: theme.transitions.create(['opacity'], {
              duration: theme.transitions.duration.standard,
              easing: theme.transitions.easing.easeInOut,
            }),
          }}
        >
          <LogoSection variant="appbar" />
        </Box>

        {/* Spacer to push actions to the right */}
        <Box sx={{ flexGrow: 1 }} />
        {/* Search Bar - Only on Desktop */}
        {!isMobile && (
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        )}

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
                  fontSize: '0.7rem',
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
                  fontSize: '0.7rem',
                }
              }}
            >
              <NotificationsIcon />
            </Badge>
          </ActionButton>

          {/* Profile Section */}
          <Box
            onClick={handleProfileMenuOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              padding: theme.spacing(0.5, 1.5),
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.primary.contrastText, 0.1),
              cursor: 'pointer',
              transition: theme.transitions.create(['background-color', 'transform'], {
                duration: theme.transitions.duration.short,
              }),
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.contrastText, 0.2),
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
                  color: theme.palette.primary.contrastText,
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                John Doe
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: alpha(theme.palette.primary.contrastText, 0.7),
                  lineHeight: 1,
                }}
              >
                Administrator
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Mobile Actions */}
        <Box sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          gap: theme.spacing(1)
        }}>
          {/* Mobile Notifications */}
          <ActionButton aria-label="show notifications">
            <Badge
              badgeContent={21}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: theme.palette.error.main,
                  color: theme.palette.error.contrastText,
                  fontWeight: theme.typography.fontWeightBold,
                  fontSize: theme.typography.caption.fontSize,
                  fontFamily: theme.typography.fontFamily,
                }
              }}
            >
              <NotificationsIcon fontSize="small" />
            </Badge>
          </ActionButton>

          {/* Mobile More Button */}
          <ActionButton
            aria-label="show more"
            aria-controls="mobile-menu"
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
          >
            <MoreIcon fontSize="small" />
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