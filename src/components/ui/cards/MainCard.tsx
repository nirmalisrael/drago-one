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
}

export const MainCard: React.FC<MainCardProps> = ({
  title,
  action,
  children,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: theme.shadows[3],
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* Card Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1.5,
          backgroundColor: theme.palette.primary.main,
          borderTopLeftRadius: parseInt(theme.shape.borderRadius as string, 2) * 2,
          borderTopRightRadius: parseInt(theme.shape.borderRadius as string, 2) * 2,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: theme.typography.h4,
          }}
        >
          {title}
        </Typography>

        {action && (
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
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
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
};
