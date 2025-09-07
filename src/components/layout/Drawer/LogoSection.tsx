// LogoSection.tsx - Fully Theme-Driven
import React from 'react';
import { Box, Typography, useTheme, alpha, keyframes } from '@mui/material';
import logo from '@/assets/images/logo/logo_gg.png';

interface LogoSectionProps {
  collapsed?: boolean;
  showText?: boolean;
  variant?: 'appbar' | 'drawer' | 'standalone';
  showStatusIndicator?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

// Animation keyframes (using theme colors dynamically later)
const pulseAnimation = (color: string) => keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 ${color}; }
  70% { transform: scale(1); box-shadow: 0 0 0 10px ${alpha(color, 0)}; }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 ${alpha(color, 0)}; }
`;

const glowAnimation = (color: string) => keyframes`
  0%, 100% { filter: drop-shadow(0 0 2px ${alpha(color, 0.3)}); }
  50% { filter: drop-shadow(0 0 8px ${alpha(color, 0.6)}); }
`;

const LogoSection: React.FC<LogoSectionProps> = ({
  collapsed = false,
  showText = true,
  variant = 'appbar',
  showStatusIndicator = false,
  interactive = true,
  onClick
}) => {
  const theme = useTheme();

  const themeConfig = {
    appbar: {
      logoSize: theme.spacing(4.5),
      logoScale: 1.4,
      containerBg: alpha(theme.palette.background.paper, 0.05),
      containerBorder: alpha(theme.palette.divider, 0.1),
      textColor: theme.palette.primary.contrastText,
      textSecondary: alpha(theme.palette.primary.contrastText, 0.8),
      hoverTextColor: alpha(theme.palette.primary.dark, 0.9),
      logoFilter: 'brightness(1.1) contrast(1.05)',
      elevation: theme.shadows[2],
      pulseColor: theme.palette.success.main,
      glowColor: theme.palette.primary.main
    },
    drawer: {
      logoSize: collapsed ? theme.spacing(4) : theme.spacing(5),
      logoScale: 1.3,
      containerBg: alpha(theme.palette.primary.main, 0.08),
      containerBorder: alpha(theme.palette.primary.main, 0.15),
      textColor: theme.palette.text.primary,
      textSecondary: theme.palette.text.secondary,
      hoverTextColor: theme.palette.primary.main,
      logoFilter: 'none',
      elevation: theme.shadows[1],
      pulseColor: theme.palette.success.main,
      glowColor: theme.palette.primary.main
    },
    standalone: {
      logoSize: theme.spacing(6),
      logoScale: 1.2,
      containerBg: alpha(theme.palette.background.paper, 0.9),
      containerBorder: alpha(theme.palette.divider, 0.2),
      textColor: theme.palette.text.primary,
      textSecondary: theme.palette.text.secondary,
      hoverTextColor: theme.palette.primary.main,
      logoFilter: 'none',
      elevation: theme.shadows[3],
      pulseColor: theme.palette.success.main,
      glowColor: theme.palette.primary.main
    }
  };

  const config = themeConfig[variant];

  return (
    <Box
      onClick={interactive ? onClick : undefined}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: collapsed ? 0 : theme.spacing(1.5),
        padding: theme.spacing(1, 2),
        borderRadius: Number(theme.shape.borderRadius.valueOf()) * 2,
        background: variant !== 'standalone' ? 'transparent' : config.containerBg,
        backdropFilter: variant === 'appbar' ? 'blur(10px)' : 'none',
        border: variant === 'standalone' ? `1px solid ${config.containerBorder}` : 'none',
        cursor: interactive ? 'pointer' : 'default',
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
        transition: theme.transitions.create([
          'gap',
          'padding',
          'background-color',
          'border-color',
          'transform',
          'box-shadow'
        ], { duration: theme.transitions.duration.standard, easing: theme.transitions.easing.easeInOut }),
        ...(interactive && {
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: config.elevation,
            background: alpha(config.containerBg, 0.8),
            '& .logo-container img': {
              animation: `${glowAnimation(config.glowColor)} 2s ease-in-out infinite`,
            },
            '& .logo-text-primary': { color: config.hoverTextColor, transform: 'translateX(2px)' },
            '& .logo-text-secondary': { color: alpha(config.hoverTextColor, 0.8), transform: 'translateX(2px)' },
            '& .status-indicator': { transform: 'scale(1.1)' },
          }
        }),
        '&:active': interactive ? { transform: 'translateY(0px) scale(0.98)' } : {},
        [theme.breakpoints.down('sm')]: { padding: theme.spacing(0.25, 0.5), gap: collapsed ? 0 : theme.spacing(1) }
      }}
    >
      {/* Logo Container */}
      <Box
        className="logo-container"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: config.logoSize,
          height: config.logoSize,
          borderRadius: Number(theme.shape.borderRadius) * 1.5,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          position: 'relative',
          transition: theme.transitions.create(['transform', 'background', 'border-color', 'box-shadow'], {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.easeOut
          }),
          boxShadow: `inset 0 1px 2px ${alpha(theme.palette.common.black, 0.05)}`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.common.white, 0.2)}, transparent)`,
            borderRadius: 'inherit',
            transition: theme.transitions.create('left', { duration: theme.transitions.duration.complex }),
          },
          ...(interactive && { '&:hover::before': { left: '100%' } })
        }}
      >
        <img
          src={logo}
          alt="GradGuide Logo"
          style={{
            width: `calc(${config.logoSize} * ${config.logoScale})`,
            height: `calc(${config.logoSize} * ${config.logoScale})`,
            objectFit: 'contain',
            filter: config.logoFilter,
            transition: theme.transitions.create(['filter', 'transform'], { duration: theme.transitions.duration.short }),
          }}
        />
      </Box>

      {/* Logo Text */}
      {showText && !collapsed && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minWidth: 0,
            mx: 1,
            opacity: collapsed ? 0 : 1,
            visibility: collapsed ? 'hidden' : 'visible',
            transform: collapsed ? 'translateX(-10px)' : 'translateX(0px)',
            transition: theme.transitions.create(['opacity', 'visibility', 'transform'], { duration: theme.transitions.duration.standard, easing: theme.transitions.easing.easeInOut }),
          }}
        >
          <Typography
            className="logo-text-primary"
            variant={variant === 'appbar' ? 'h6' : 'h5'}
            component="div"
            sx={{
              fontWeight: theme.typography.fontWeightBold,
              fontSize: variant === 'appbar' ? theme.typography.h6.fontSize : theme.typography.h5.fontSize,
              lineHeight: 1.2,
              color: config.textColor,
              letterSpacing: theme.typography.button.letterSpacing,
              fontFamily: theme.typography.h1.fontFamily,
              transition: theme.transitions.create(['color', 'transform'], { duration: theme.transitions.duration.short }),
              textShadow: variant === 'appbar' ? `0 1px 2px ${alpha(theme.palette.common.black, 0.1)}` : 'none',
              [theme.breakpoints.down('sm')]: { fontSize: variant === 'appbar' ? theme.typography.h4.fontSize : theme.typography.h6.fontSize },
            }}
          >
            GradGuide
          </Typography>

          <Typography
            className="logo-text-secondary"
            variant="caption"
            component="div"
            sx={{
              fontSize: variant === 'appbar' ? theme.typography.caption.fontSize : theme.typography.body2.fontSize,
              fontWeight: theme.typography.fontWeightMedium,
              color: config.textSecondary,
              letterSpacing: '0.5px',
              lineHeight: 1.1,
              marginTop: theme.spacing(-0.25),
              fontFamily: theme.typography.body1.fontFamily,
              transition: theme.transitions.create(['color', 'transform'], { duration: theme.transitions.duration.short }),
              [theme.breakpoints.down('sm')]: { fontSize: theme.typography.caption.fontSize, display: variant === 'appbar' ? 'none' : 'block' },
            }}
          >
            Empowering Institutions, Enabling Students.
          </Typography>
        </Box>
      )}

      {/* Status Indicator */}
      {showStatusIndicator && !collapsed && (
        <Box className="status-indicator" sx={{ position: 'relative', width: theme.spacing(1), height: theme.spacing(1), marginLeft: theme.spacing(1), transition: theme.transitions.create(['transform', 'opacity'], { duration: theme.transitions.duration.standard }) }}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: config.pulseColor,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: 'inherit',
                animation: `${pulseAnimation(config.pulseColor)} 2s infinite`,
              },
            }}
          />
        </Box>
      )}

      {/* Ripple overlay */}
      {interactive && (
        <Box sx={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          background: 'radial-gradient(circle, transparent 1%, transparent 1%)',
          backgroundSize: '15000%',
          transition: theme.transitions.create(['background-size'], { duration: theme.transitions.duration.short }),
          '&:active': { backgroundSize: '100%', background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 1%, transparent 1%)` },
        }} />
      )}
    </Box>
  );
};

export default LogoSection;
