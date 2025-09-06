// CollapsedMenuItems.tsx
import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popper,
  ClickAwayListener,
  useTheme
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import type { MenuItemType } from '../../types/DrawerTypes';

interface CollapsedMenuItemProps {
  item: MenuItemType;
  active: boolean;
}

const CollapsedMenuItem: React.FC<CollapsedMenuItemProps> = ({ item, active }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (item.subItems && item.subItems.length > 0) {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleClickAway = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  // If item has no subItems, render as a simple link
  if (!item.subItems || item.subItems.length === 0) {
    return (
      <Tooltip title={item.label} placement="right" arrow>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
          <IconButton
            component={RouterLink}
            to={item.path || '#'}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              backgroundColor: active ? theme.palette.primary.main : 'transparent',
              color: active ? theme.palette.primary.contrastText : theme.palette.primary.main,
              '&:hover': {
                backgroundColor: active
                  ? theme.palette.primary.dark
                  : theme.palette.action.hover,
              },
              transition: theme.transitions.create(['background-color', 'color'], {
                duration: theme.transitions.duration.short,
              }),
            }}
          >
            {item.icon}
          </IconButton>
        </Box>
      </Tooltip>
    );
  }

  // If item has subItems, render with hover menu
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative' }}>
        {/* <Tooltip title={item.label} placement="right" arrow> */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
          <IconButton
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              backgroundColor: active ? theme.palette.primary.main : 'transparent',
              color: active ? theme.palette.primary.contrastText : theme.palette.primary.main,
              '&:hover': {
                backgroundColor: active
                  ? theme.palette.primary.dark
                  : theme.palette.action.hover,
              },
              transition: theme.transitions.create(['background-color', 'color'], {
                duration: theme.transitions.duration.short,
              }),
            }}
          >
            {item.icon}
          </IconButton>
        </Box>
        {/* </Tooltip> */}

        {/* Submenu Popper */}
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="right-start"
          sx={{ zIndex: theme.zIndex.drawer + 1 }}
          modifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 0],
              },
            },
          ]}
        >
          <Paper
            elevation={8}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={handleMouseLeave}
            sx={{
              ml: 1,
              minWidth: 200,
              maxWidth: 280,
              borderRadius: 2,
              overflow: 'hidden',
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            {/* Submenu Header */}
            <Box
              sx={{
                px: 2,
                py: 1.5,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {item.icon}
                <Box sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  {item.label}
                </Box>
              </Box>
            </Box>

            {/* Submenu Items */}
            <List disablePadding>
              {item.subItems.map((subItem, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to={subItem.path || '#'}
                    sx={{
                      px: 2,
                      py: 1,
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                      '&.active': {
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.light,
                        },
                      },
                    }}
                  >
                    <ListItemText
                      primary={subItem.label}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: subItem.path === location.pathname ? 600 : 400,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

interface CollapsedMenuItemsProps {
  menuData: MenuItemType[];
}

const CollapsedMenuItems: React.FC<CollapsedMenuItemsProps> = ({ menuData }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isItemActive = (item: MenuItemType): boolean => {
    if (item.path === currentPath) return true;
    if (item.subItems) {
      return item.subItems.some(subItem => subItem.path === currentPath);
    }
    return false;
  };

  return (
    <Box sx={{ py: 2, px: 1 }}>
      {menuData.map((item, index) => (
        <CollapsedMenuItem
          key={index}
          item={item}
          active={isItemActive(item)}
        />
      ))}
    </Box>
  );
};

export default CollapsedMenuItems;