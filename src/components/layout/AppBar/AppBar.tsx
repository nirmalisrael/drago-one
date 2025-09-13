// AppBarComponent.tsx - Corrected Version with Proper Theme Color Usage
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

const APP_BAR_INPUT_HEIGHT = 42; // Same as IconButton

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
  height: APP_BAR_INPUT_HEIGHT,
  minHeight: APP_BAR_INPUT_HEIGHT,
  borderRadius: theme.shape.borderRadius,
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

// CORRECTED: Action buttons now use proper contrast colors
const ActionButton = styled(IconButton)(({ theme }) => ({
  width: 44,
  height: APP_BAR_INPUT_HEIGHT,
  // FIXED: Use action.hover with primary contrast text for better visibility
  backgroundColor: alpha(theme.palette.action?.hover || theme.palette.primary.contrastText, 0.1),
  color: theme.palette.primary.contrastText,
  margin: theme.spacing(0, 0.5),
  border: `1px solid ${alpha(theme.palette.primary.contrastText, 0.2)}`,
  backdropFilter: 'blur(8px)',
  '&:hover': {
    // FIXED: Use action.selected for hover state
    backgroundColor: alpha(theme.palette.action?.selected || theme.palette.primary.contrastText, 0.15),
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.dark, 0.25)}`,
    borderColor: alpha(theme.palette.primary.contrastText, 0.4),
  },
  '&:active': {
    transform: 'translateY(-1px)',
    // FIXED: Use action.selected for active state
    backgroundColor: alpha(theme.palette.action?.selected || theme.palette.primary.contrastText, 0.2),
  },
  '&:focus-visible': {
    // FIXED: Use primary.light for focus outline on dark backgrounds
    outline: `2px solid ${theme.palette.primary.light}`,
    outlineOffset: '2px',
  },
  transition: theme.transitions.create([
    'background-color',
    'transform',
    'box-shadow',
    'border-color'
  ], {
    duration: theme.transitions.duration.short,
  }),
}));

// FIXED: Toggle button uses same pattern as ActionButton for consistency
const ToggleButton = styled(IconButton)(({ theme }) => ({
  width: 44,
  height: APP_BAR_INPUT_HEIGHT,
  backgroundColor: alpha(theme.palette.action?.hover || theme.palette.primary.contrastText, 0.1),
  color: theme.palette.primary.contrastText,
  border: `1px solid ${alpha(theme.palette.primary.contrastText, 0.2)}`,
  backdropFilter: 'blur(8px)',
  '&:hover': {
    backgroundColor: alpha(theme.palette.action?.selected || theme.palette.primary.contrastText, 0.15),
    transform: 'scale(1.05) translateY(-1px)',
    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.dark, 0.25)}`,
    borderColor: alpha(theme.palette.primary.contrastText, 0.4),
  },
  '&:active': {
    transform: 'scale(1.02)',
    backgroundColor: alpha(theme.palette.action?.selected || theme.palette.primary.contrastText, 0.2),
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.light}`,
    outlineOffset: '2px',
  },
  transition: theme.transitions.create([
    'background-color',
    'transform',
    'box-shadow',
    'border-color'
  ], {
    duration: theme.transitions.duration.short,
  }),
}));

// CORRECTED: Profile section uses consistent styling with other interactive elements
const ProfileSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(0.75, 2),
  borderRadius: Number(theme.shape.borderRadius),
  // FIXED: Consistent with ActionButton styling
  backgroundColor: alpha(theme.palette.action?.hover || theme.palette.primary.contrastText, 0.1),
  border: `1px solid ${alpha(theme.palette.primary.contrastText, 0.2)}`,
  cursor: 'pointer',
  backdropFilter: 'blur(8px)',
  transition: theme.transitions.create([
    'background-color',
    'transform',
    'box-shadow',
    'border-color'
  ], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: alpha(theme.palette.action?.selected || theme.palette.primary.contrastText, 0.15),
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.dark, 0.25)}`,
    borderColor: alpha(theme.palette.primary.contrastText, 0.4),
  },
  '&:active': {
    transform: 'translateY(-1px)',
    backgroundColor: alpha(theme.palette.action?.selected || theme.palette.primary.contrastText, 0.2),
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.light}`,
    outlineOffset: '2px',
  },
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

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isMenuOpen = Boolean(anchorEl);

  console.log(collapsed);

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
        // FIXED: Better gradient using primary color variants
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        // FIXED: Use primary.dark with proper alpha for shadow
        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.dark, 0.4)}`,
        // FIXED: Use primary.light with lower alpha for subtle border
        borderBottom: `1px solid ${alpha(theme.palette.primary.light, 0.15)}`,
        backdropFilter: 'blur(10px)',
        transition: theme.transitions.create(['width', 'margin-left', 'background'], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.standard,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: '100%',
          minHeight: 'auto !important',
          px: { xs: 2, sm: 3 },
          gap: theme.spacing(2),
        }}
      >
        {/* Mobile Menu Button */}
        {isMobile && (
          <ToggleButton
            edge="start"
            aria-label="toggle drawer"
            onClick={onDrawerToggle}
          >
            <MenuIcon />
          </ToggleButton>
        )}

        {/* Desktop Drawer Toggle Button */}
        {!isMobile && (
          <ToggleButton
            onClick={onToggleCollapse}
            aria-label="toggle drawer"
          >
            <MenuIcon />
          </ToggleButton>
        )}

        {/* Logo Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
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
              placeholder="Search anything…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        )}

        {/* Desktop Actions */}
        <Box sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          gap: theme.spacing(1)
        }}>
          <ActionButton
            aria-label="show new mails"
            title="Messages"
          >
            <Badge
              badgeContent={4}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  // FIXED: Use semantic error colors consistently
                  backgroundColor: theme.palette.error.main,
                  color: theme.palette.error.contrastText,
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  minWidth: '18px',
                  height: '18px',
                  // FIXED: Use background.paper for badge border instead of primary
                  border: `2px solid ${theme.palette.background.paper}`,
                  boxShadow: `0 2px 8px ${alpha(theme.palette.error.main, 0.4)}`,
                }
              }}
            >
              <MailIcon fontSize="small" />
            </Badge>
          </ActionButton>

          <ActionButton
            aria-label="show new notifications"
            title="Notifications"
          >
            <Badge
              badgeContent={17}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: theme.palette.error.main,
                  color: theme.palette.error.contrastText,
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  minWidth: '18px',
                  height: '18px',
                  border: `2px solid ${theme.palette.background.paper}`,
                  boxShadow: `0 2px 8px ${alpha(theme.palette.error.main, 0.4)}`,
                }
              }}
            >
              <NotificationsIcon fontSize="small" />
            </Badge>
          </ActionButton>

          {/* Enhanced Profile Section */}
          <ProfileSection
            onClick={handleProfileMenuOpen}
            role="button"
            tabIndex={0}
            aria-label="User profile menu"
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                // FIXED: Use secondary.main for avatar background
                backgroundColor: theme.palette.secondary.main,
                // FIXED: Use secondary.contrastText for avatar text
                color: theme.palette.secondary.contrastText,
                fontSize: '0.875rem',
                fontWeight: 700,
                // FIXED: Use background.paper for avatar border
                border: `2px solid ${theme.palette.background.paper}`,
                boxShadow: `0 2px 8px ${alpha(theme.palette.secondary.dark, 0.3)}`,
              }}
            >
              JD
            </Avatar>
            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.primary.contrastText,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  fontSize: '0.875rem',
                }}
              >
                John Doe
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  // FIXED: Use primary.light for secondary text on primary background
                  color: theme.palette.primary.light,
                  lineHeight: 1,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                }}
              >
                Administrator
              </Typography>
            </Box>
          </ProfileSection>
        </Box>

        {/* Mobile Actions */}
        <Box sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          gap: theme.spacing(1)
        }}>
          {/* Mobile Notifications */}
          <ActionButton
            aria-label="show notifications"
            title="Notifications"
          >
            <Badge
              badgeContent={21}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: theme.palette.error.main,
                  color: theme.palette.error.contrastText,
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  minWidth: '16px',
                  height: '16px',
                  border: `2px solid ${theme.palette.background.paper}`,
                  boxShadow: `0 2px 8px ${alpha(theme.palette.error.main, 0.4)}`,
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
            title="More options"
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