import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';

interface MainCardProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  sx?: any; // Allow custom styling
}

export const MainCard: React.FC<MainCardProps> = ({
  title,
  action,
  children,
  sx,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: theme.shape?.borderRadius || 2,
        // Use theme shadows array properly - MUI shadows go from 0-24
        boxShadow: theme.shadows?.[3] || '0 4px 16px rgba(0,0,0,0.12)',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden', // Ensures header background doesn't overflow
        ...sx, // Allow custom overrides
      }}
    >
      {/* Card Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: theme.spacing(2),
          py: theme.spacing(1.5),
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          // Remove manual border radius calculation - let overflow: hidden handle it
        }}
      >
        <Typography
          variant="h6"
          component="h2" // Better semantic HTML
          sx={{
            fontWeight: theme.typography.fontWeightBold || 600,
            // Fix: Use proper typography property access
            fontSize: theme.typography.h6.fontSize, // Use h6 fontSize, not h4 object
            lineHeight: theme.typography.h6.lineHeight,
            color: 'inherit', // Inherit from parent instead of theme
          }}
        >
          {title}
        </Typography>

        {action && (
          <Box
            sx={{
              display: 'flex',
              gap: theme.spacing(1),
              alignItems: 'center',
              // Ensure action items use contrast color
              '& *': {
                color: theme.palette.primary.contrastText,
              },
              // Handle icon buttons in the action area
              '& .MuiIconButton-root': {
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: `rgba(255, 255, 255, 0.1)`,
                },
              },
              // Handle regular buttons in the action area
              '& .MuiButton-root': {
                color: theme.palette.primary.contrastText,
                borderColor: theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: `rgba(255, 255, 255, 0.1)`,
                  borderColor: theme.palette.primary.contrastText,
                },
              },
            }}
          >
            {action}
          </Box>
        )}
      </Box>

      {/* Card Body */}
      <CardContent
        sx={{
          padding: theme.spacing(2),
          '&:last-child': {
            paddingBottom: theme.spacing(2), // Override MUI default last-child padding
          },
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
};