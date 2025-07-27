// LogoSection.tsx - Enhanced for Real-time Application
import React from 'react';
import { Box, Typography, useTheme, alpha } from '@mui/material';
import logo from '@/assets/images/icon.png';

interface LogoSectionProps {
  collapsed?: boolean;
  showText?: boolean;
  variant?: 'appbar' | 'drawer' | 'standalone';
}

const LogoSection: React.FC<LogoSectionProps> = ({
  collapsed = false,
  showText = true,
  variant = 'appbar'
}) => {
  const theme = useTheme();

  // Dynamic sizing based on variant and state
  const getLogoSize = () => {
    if (variant === 'drawer' && collapsed) return 32;
    if (variant === 'appbar') return 36;
    if (variant === 'drawer') return 40;
    return 48; // standalone
  };

  const logoSize = getLogoSize();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: collapsed ? 0 : 1.5,
        transition: theme.transitions.create(['gap', 'opacity'], {
          duration: theme.transitions.duration.standard,
          easing: theme.transitions.easing.easeInOut,
        }),
        cursor: 'pointer',
        '&:hover': {
          '& .logo-image': {
            transform: 'scale(1.05)',
          },
          '& .logo-text': {
            color: variant === 'appbar'
              ? alpha(theme.palette.primary.contrastText, 0.9)
              : theme.palette.primary.main,
          }
        }
      }}
    >
      {/* Logo Image */}
      <Box
        className="logo-image"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: logoSize,
          height: logoSize,
          // borderRadius: variant === 'appbar' ? 1.5 : 2,
          // backgroundColor: variant === 'appbar'
          //   ? alpha(theme.palette.common.white, 0.1)
          //   : alpha(theme.palette.primary.main, 0.1),
          // backdropFilter: 'blur(10px)',
          // border: `1px solid ${variant === 'appbar'
          //   ? alpha(theme.palette.common.white, 0.2)
          //   : alpha(theme.palette.primary.main, 0.2)
          //   }`,
          transition: theme.transitions.create(['transform', 'box-shadow'], {
            duration: theme.transitions.duration.short,
          }),
          // '&:hover': {
          //   boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.15)}`,
          // }
        }}
      >
        <img
          src={logo}
          alt="Company Logo"
          style={{
            width: logoSize * 1.5, // 70% of container
            height: logoSize * 1.5,
            objectFit: 'contain',
            filter: variant === 'appbar' ? 'brightness(1.1)' : 'none',
          }}
        />
      </Box>

      {/* Logo Text */}
      {showText && !collapsed && (
        <Box
          className="logo-text"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            opacity: collapsed ? 0 : 1,
            visibility: collapsed ? 'hidden' : 'visible',
            transition: theme.transitions.create(['opacity', 'visibility'], {
              duration: theme.transitions.duration.standard,
              easing: theme.transitions.easing.easeInOut,
            }),
          }}
        >
          <Typography
            variant={variant === 'appbar' ? 'h6' : 'h5'}
            sx={{
              fontWeight: 700,
              fontSize: variant === 'appbar' ? theme.typography.h4.fontSize : theme.typography.h5.fontSize,
              lineHeight: 1.5,
              color: variant === 'appbar'
                ? theme.palette.primary.contrastText
                : theme.palette.text.primary,
              letterSpacing: '0.5px',
              transition: theme.transitions.create('color', {
                duration: theme.transitions.duration.short,
              }),
            }}
          >
            DRAGO
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: variant === 'appbar' ? theme.typography.h5.fontSize : theme.typography.h6.fontSize,
              fontWeight: 500,
              color: variant === 'appbar'
                ? alpha(theme.palette.primary.contrastText, 0.8)
                : alpha(theme.palette.text.secondary, 0.9),
              letterSpacing: '1px',
              textTransform: 'uppercase',
              lineHeight: 1,
              mt: -0.5,
            }}
          >
            One
          </Typography>
        </Box>
      )}

      {/* Pulse indicator for real-time status */}
      {/* <Box
        sx={{
          position: 'relative',
          width: 8,
          height: 8,
          ml: collapsed ? 0 : 'auto',
          opacity: collapsed ? 0 : 1,
          transition: theme.transitions.create(['opacity'], {
            duration: theme.transitions.duration.standard,
          }),
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: theme.palette.success.main,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: theme.palette.success.main,
              animation: 'pulse 2s infinite',
            },
            '@keyframes pulse': {
              '0%': {
                transform: 'scale(0.95)',
                boxShadow: `0 0 0 0 ${alpha(theme.palette.success.main, 0.7)}`,
              },
              '70%': {
                transform: 'scale(1)',
                boxShadow: `0 0 0 10px ${alpha(theme.palette.success.main, 0)}`,
              },
              '100%': {
                transform: 'scale(0.95)',
                boxShadow: `0 0 0 0 ${alpha(theme.palette.success.main, 0)}`,
              },
            },
          }}
        />
      </Box> */}
    </Box>
  );
};

export default LogoSection;