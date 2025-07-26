import React from 'react';
import { AppBar, Toolbar, IconButton, Box, styled, alpha, InputBase, useTheme, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { APP_BAR_DESKTOP_HEIGHT, APP_BAR_MOBILE_HEIGHT, DRAWER_WIDTH } from '@/constants/layout';
import LogoSection from './LogoSection';
import MobileMenu from './MobileMenu'; // Import MobileMenu

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
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
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: theme.typography.fontSize,
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface AppBarComponentProps {
  open: boolean;
  isMobile: boolean;
  onDrawerToggle: () => void;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({ open, onDrawerToggle, isMobile }) => {
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
    <Box sx={{ flexGrow: 1, width: open ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%' }}>
      <AppBar
        position="fixed"
        sx={{
          width: open ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
          height: isMobile ? APP_BAR_MOBILE_HEIGHT : APP_BAR_DESKTOP_HEIGHT,
          transition: theme.transitions.create(['width', 'margin-left'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar>
          {!open && (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={onDrawerToggle}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ display: { xs: 'none', md: 'grid' }, width: 'auto' }}>
                <LogoSection />
              </Box>
            </>
          )}

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls="mobile-menu"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <MobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        anchorEl={anchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
        handleMenuClose={handleMenuClose}
        isMenuOpen={isMenuOpen}
      />
    </Box>
  );
};

export default AppBarComponent;
