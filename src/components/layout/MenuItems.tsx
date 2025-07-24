import React, { useState, useEffect } from 'react';
import { Box, Typography, Collapse, List } from '@mui/material';
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import type { MenuItemType } from './types/DrawerTypes';
import { useTheme } from '@mui/material/styles';

interface MenuItemProps {
  label: string;
  path?: string;
  onClick?: (e: React.MouseEvent) => void;
  icon?: React.ReactNode;
  active: boolean;
  depth?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  path,
  onClick,
  icon,
  active,
  depth = 0
}) => {
  const theme = useTheme();
  const paddingLeft = `${8 + depth * 8}px`; // Indent based on depth

  return (
    <Box
      component={path ? RouterLink : 'div'}
      to={path || ''}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        textDecoration: 'none',
        color: active ? theme.palette.background.default : 'inherit',
        padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
        paddingLeft,
        marginBottom: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: active
          ? theme.palette.primary.main
          : 'transparent',
        '&:hover': {
          backgroundColor: active
            ? theme.palette.secondary.main  // Light background for active item on hover
            : theme.palette.action.hover,   // Default hover background color
          color: active ? '#000000' : 'inherit', // Ensure text is black when active, otherwise inherit color
          cursor: 'pointer', // Ensure cursor is a pointer on hover
        },
        transition: 'background-color 200ms ease, transform 150ms ease, box-shadow 150ms ease',
        // boxShadow: active ? `0 4px 8px ${theme.palette.primary.main}` : 'none', // Add subtle shadow on hover or active state
        borderRight: active ? `2px solid ${theme.palette.primary.main}` : 'none',
      }}
      onClick={onClick}
    >
      {icon && <Typography sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>{icon}</Typography>}
      <Typography variant="body1" sx={{
        fontWeight: active ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
        ml: !icon ? 2 : 0
      }}>
        {label}
      </Typography>
    </Box>
  );
};

interface SubmenuProps {
  label: string;
  items: MenuItemType[];
  currentPath: string;
  depth?: number;
}

const Submenu: React.FC<SubmenuProps> = ({ label, items, currentPath, depth = 0 }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Check if any child item is active to keep submenu expanded
  useEffect(() => {
    const isActive = items.some(item =>
      item.path && matchPath(item.path, location.pathname) ||
      (item.subItems?.some(subItem => subItem.path && matchPath(subItem.path, location.pathname)))
    );
    setOpen(isActive);
  }, [location.pathname, items]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(prev => !prev);
  };

  // Check if this submenu contains the active path
  const isActive = items.some(item =>
    item.path === currentPath ||
    (item.subItems?.some(subItem => subItem.path === currentPath)));

  return (
    <Box>
      <MenuItem
        label={label}
        onClick={handleToggle}
        active={isActive}
        icon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        depth={depth}
      />
      <Collapse in={open} sx={{ transition: 'height 0.3s ease-in-out' }}>
        <List component="div" disablePadding sx={{ pl: 2 }}>
          {items.map((item, index) => (
            <Box key={index + 1}>
              {item.subItems ? (
                <Submenu
                  label={item.label}
                  items={item.subItems}
                  currentPath={currentPath}
                  depth={depth + 1}
                />
              ) : (
                <MenuItem
                  label={item.label}
                  path={item.path}
                  active={item.path === currentPath}
                  depth={depth + 1}
                  icon={item.icon}
                />
              )}
            </Box>
          ))}
        </List>
      </Collapse>
    </Box>
  );
};

interface MenuItemsProps {
  menuData: MenuItemType[];
}

const MenuItems: React.FC<MenuItemsProps> = ({ menuData }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Box sx={{ padding: 2, borderRight: `1px solid ${useTheme().palette.divider}` }}>
      {menuData.map((item, index) => (
        <Box key={index + 1}>
          {item.subItems ? (
            <Submenu
              label={item.label}
              items={item.subItems}
              currentPath={currentPath}
            />
          ) : (
            <MenuItem
              label={item.label}
              path={item.path}
              active={item.path === currentPath}
              icon={item.icon}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default MenuItems;
