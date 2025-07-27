// UnifiedMenuItems.tsx - Improved Version
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Collapse,
  List,
  IconButton,
  Tooltip,
  Paper,
  ListItem,
  ListItemButton,
  ListItemText,
  Popper,
  useTheme
} from '@mui/material';
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import type { MenuItemType } from '../../types/DrawerTypes';

interface MenuItemProps {
  label: string;
  path?: string;
  onClick?: (e: React.MouseEvent) => void;
  icon?: React.ReactNode;
  active: boolean;
  depth?: number;
  collapsed?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  path,
  onClick,
  icon,
  active,
  depth = 0,
  collapsed = false
}) => {
  const theme = useTheme();

  // Consistent sizing for both states
  const itemHeight = 48;
  const iconSize = 24;
  const paddingLeft = collapsed ? 12 : 8 + depth * 16;

  if (collapsed) {
    return (
      <Tooltip title={label} placement="right" arrow>
        <Box sx={{
          display: 'flex',
          mb: 0.5,
          justifyContent: 'start',
          width: '100%',
          transition: theme.transitions.create(['width'], {
            duration: theme.transitions.duration.standard,
          }),
        }}>
          <IconButton
            component={path ? RouterLink : 'div'}
            to={path || ''}
            onClick={onClick}
            sx={{
              width: 48,
              height: itemHeight,
              borderRadius: 2,
              backgroundColor: active
                ? `${theme.palette.primary.main}10`
                : 'transparent',
              border: active
                ? `1px solid ${theme.palette.primary.main}30`
                : '1px solid transparent',
              color: active
                ? theme.palette.primary.main
                : theme.palette.text.primary,
              '&:hover': {
                backgroundColor: active
                  ? `${theme.palette.primary.main}25`
                  : `${theme.palette.action.hover}80`,
                transform: 'scale(1.05)',
                boxShadow: theme.shadows[4],
              },
              transition: theme.transitions.create(['background-color', 'color', 'transform', 'box-shadow', 'border'], {
                duration: theme.transitions.duration.short,
              }),
            }}
          >
            {icon}
          </IconButton>
        </Box>
      </Tooltip>
    );
  }

  return (
    <Box
      component={path ? RouterLink : 'div'}
      to={path || ''}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: itemHeight,
        textDecoration: 'none',
        color: active
          ? theme.palette.primary.main
          : theme.palette.text.primary,
        padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
        paddingLeft: `${paddingLeft}px`,
        marginBottom: 0.5,
        borderRadius: 2,
        backgroundColor: active
          ? `${theme.palette.primary.main}10`
          : 'transparent',
        border: active
          ? `1px solid ${theme.palette.primary.main}30`
          : '1px solid transparent',
        '&:hover': {
          backgroundColor: active
            ? `${theme.palette.primary.main}20`
            : `${theme.palette.action.hover}60`,
          transform: 'translateX(4px)',
          boxShadow: `0 2px 8px ${theme.palette.primary.main}20`,
        },
        transition: theme.transitions.create(['background-color', 'color', 'transform', 'box-shadow', 'border'], {
          duration: theme.transitions.duration.short,
        }),
      }}
      onClick={onClick}
    >
      {icon && (
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: iconSize,
          height: iconSize,
          mr: 2,
          flexShrink: 0,
        }}>
          {icon}
        </Box>
      )}
      <Typography
        variant="body2"
        sx={{
          fontWeight: active ? theme.typography.fontWeightBold : theme.typography.fontWeightRegular,
          // fontSize: '0.875rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          flex: 1,
          cursor: 'pointer',
        }}
      >
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
  icon?: React.ReactNode;
  collapsed?: boolean;
}

const ExpandIcon = (open: boolean) => (
  open ? <ExpandLessIcon /> : <ExpandMoreIcon />
);

function usePopperHandlers(collapsed: boolean) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popperOpen, setPopperOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (collapsed) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setAnchorEl(event.currentTarget);
      setPopperOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (collapsed) {
      timeoutRef.current = setTimeout(() => {
        setPopperOpen(false);
        setAnchorEl(null);
      }, 300);
    }
  };

  const handlePopperMouseEnter = () => {
    if (collapsed) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPopperOpen(true);
    }
  };

  const handlePopperMouseLeave = () => {
    if (collapsed) {
      timeoutRef.current = setTimeout(() => {
        setPopperOpen(false);
        setAnchorEl(null);
      }, 200);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    anchorEl,
    popperOpen,
    handleMouseEnter,
    handleMouseLeave,
    handlePopperMouseEnter,
    handlePopperMouseLeave,
    setAnchorEl,
    setPopperOpen,
  };
}

const CollapsedSubmenu: React.FC<{
  label: string;
  items: MenuItemType[];
  currentPath: string;
  icon?: React.ReactNode;
  isActive: boolean;
}> = ({ label, items, currentPath, icon, isActive }) => {
  const theme = useTheme();
  const {
    anchorEl,
    popperOpen,
    handleMouseEnter,
    handleMouseLeave,
    handlePopperMouseEnter,
    handlePopperMouseLeave,
  } = usePopperHandlers(true);

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{ display: 'flex', justifyContent: 'start', mb: 0.5 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <IconButton
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            backgroundColor: isActive
              ? `${theme.palette.primary.main}10`
              : 'transparent',
            border: isActive
              ? `1px solid ${theme.palette.primary.main}30`
              : '1px solid transparent',
            color: isActive
              ? theme.palette.primary.main
              : theme.palette.text.primary,
            '&:hover': {
              backgroundColor: isActive
                ? `${theme.palette.primary.main}25`
                : `${theme.palette.action.hover}80`,
              transform: 'scale(1.05)',
              boxShadow: theme.shadows[4],
            },
            transition: theme.transitions.create(['background-color', 'color', 'transform', 'box-shadow', 'border'], {
              duration: theme.transitions.duration.short,
            }),
          }}
        >
          {icon}
        </IconButton>
      </Box>
      <Popper
        open={popperOpen}
        anchorEl={anchorEl}
        placement="right-start"
        sx={{ zIndex: theme.zIndex.drawer + 2 }}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [12, 0],
            },
          },
        ]}
      >
        <Paper
          elevation={12}
          onMouseEnter={handlePopperMouseEnter}
          onMouseLeave={handlePopperMouseLeave}
          sx={{
            minWidth: 220,
            maxWidth: 300,
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.palette.divider}40`,
            boxShadow: `0 8px 32px ${theme.palette.common.black}20`,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}05 0%, transparent 50%)`,
              pointerEvents: 'none',
            },
          }}
        >
          <Box
            sx={{
              px: theme.spacing(2),
              py: theme.spacing(1.5),
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              color: theme.palette.primary.contrastText,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: `linear-gradient(90deg, transparent 0%, ${theme.palette.primary.contrastText}30 50%, transparent 100%)`,
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {icon}
              <Typography
                variant="body2"
                sx={{
                  fontWeight: isActive ? theme.typography.fontWeightBold : theme.typography.fontWeightRegular,

                }} >
                {label}
              </Typography>
            </Box>
          </Box>
          <List disablePadding sx={{ py: 1 }}>
            {items.map((subItem, index) => (
              <ListItem key={index + 1} disablePadding sx={{ px: 1 }}>
                <ListItemButton
                  component={RouterLink}
                  to={subItem.path || '#'}
                  sx={{
                    m: 0,
                    px: theme.spacing(1.2),
                    py: theme.spacing(.8),
                    borderRadius: 2,
                    backgroundColor: subItem.path === currentPath
                      ? `${theme.palette.primary.main}15`
                      : 'transparent',
                    border: subItem.path === currentPath
                      ? `1px solid ${theme.palette.primary.main}30`
                      : '1px solid transparent',
                    '&:hover': {
                      backgroundColor: subItem.path === currentPath
                        ? `${theme.palette.primary.main}25`
                        : `${theme.palette.action.hover}60`,
                      transform: 'translateX(4px)',
                      boxShadow: `0 2px 8px ${theme.palette.primary.main}15`,
                    },
                    transition: theme.transitions.create(['background-color', 'transform', 'box-shadow', 'border'], {
                      duration: theme.transitions.duration.short,
                    }),
                  }}
                >
                  <ListItemText
                    primary={subItem.label}
                    primaryTypographyProps={{
                      // from the body2
                      fontSize: theme.typography.fontSize,
                      fontWeight: subItem.path === currentPath ? theme.typography.fontWeightBold : theme.typography.fontWeightRegular,
                      color: subItem.path === currentPath
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popper>
    </Box>
  );
};

const Submenu: React.FC<SubmenuProps> = ({
  label,
  items,
  currentPath,
  depth = 0,
  icon,
  collapsed = false
}) => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const location = useLocation();
  const theme = useTheme();

  useEffect(() => {
    if (!collapsed) {
      const isActive = items.some(item =>
        item.path && matchPath({ path: item.path, }, location.pathname) ||
        (item.subItems?.some(subItem => subItem.path && matchPath({ path: subItem.path, }, location.pathname)))
      );
      setOpen(isActive);
    }
  }, [location.pathname, items, collapsed]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!collapsed) {
      setOpen(prev => !prev);
    }
  };

  const handleMouseEnter = () => {
    if (!collapsed) setHover(true);
  };

  const handleMouseLeave = () => {
    if (!collapsed) setHover(false);
  };

  const isActive = items.some(item =>
    item.path === currentPath ||
    (item.subItems?.some(subItem => subItem.path === currentPath))
  );

  if (collapsed) {
    return (
      <CollapsedSubmenu
        label={label}
        items={items}
        currentPath={currentPath}
        icon={icon}
        isActive={isActive}
      />
    );
  }

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        width: '100%',
        transition: theme.transitions.create(['width'], {
          duration: theme.transitions.duration.standard,
        }),
      }}
    >
      <MenuItem
        label={label}
        onClick={handleToggle}
        active={isActive}
        icon={hover || isActive ? ExpandIcon(open) : icon}
        depth={depth}
        collapsed={collapsed}
      />
      <Collapse in={open} timeout={300}>
        <List component="div" disablePadding sx={{ pl: 0 }}>
          {items.map((item, index) => (
            <Box key={index + 1}>
              {item.subItems ? (
                <Submenu
                  label={item.label}
                  items={item.subItems}
                  currentPath={currentPath}
                  depth={depth + 1}
                  icon={item.icon}
                  collapsed={collapsed}
                />
              ) : (
                <MenuItem
                  label={item.label}
                  path={item.path}
                  active={item.path === currentPath}
                  depth={depth + 1}
                  icon={item.icon}
                  collapsed={collapsed}
                />
              )}
            </Box>
          ))}
        </List>
      </Collapse>
    </Box>
  );
};

interface UnifiedMenuItemsProps {
  menuData: MenuItemType[];
  collapsed?: boolean;
}

const UnifiedMenuItems: React.FC<UnifiedMenuItemsProps> = ({ menuData, collapsed = false }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const theme = useTheme();

  return (
    <Box sx={{
      padding: collapsed ? '8px 6px' : '16px 12px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: collapsed ? 'center' : 'flex-start',
      transition: theme.transitions.create(['padding', 'align-items'], {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeInOut,
      }),
      // Add this to prevent content overflow during transition
      overflow: 'hidden',
    }}>
      {menuData.map((item, index) => (
        <Box key={index + 1} sx={{
          width: '100%',
          transition: theme.transitions.create(['width'], {
            duration: theme.transitions.duration.standard,
          }),
        }}>
          {item.subItems ? (
            <Submenu
              label={item.label}
              items={item.subItems}
              currentPath={currentPath}
              icon={item.icon}
              collapsed={collapsed}
            />
          ) : (
            <MenuItem
              label={item.label}
              path={item.path}
              active={item.path === currentPath}
              icon={item.icon}
              collapsed={collapsed}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default UnifiedMenuItems;