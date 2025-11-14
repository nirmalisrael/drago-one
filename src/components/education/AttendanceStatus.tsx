import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { useEducationColors } from '@/hooks/useEducationColors';

interface AttendanceStatusProps {
  status: 'present' | 'absent' | 'late' | 'excused' | 'tardy';
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'chip' | 'indicator' | 'card';
}

const AttendanceStatus: React.FC<AttendanceStatusProps> = ({
  status,
  showLabel = true,
  size = 'medium',
  variant = 'chip'
}) => {
  const { getAttendanceColor, getContrastText } = useEducationColors();

  const statusConfig = {
    present: { label: 'Present', icon: '✓' },
    absent: { label: 'Absent', icon: '✗' },
    late: { label: 'Late', icon: '⏰' },
    excused: { label: 'Excused', icon: '📝' },
    tardy: { label: 'Tardy', icon: '⏱️' }
  };

  const backgroundColor = getAttendanceColor(status);
  const textColor = getContrastText(backgroundColor);
  const config = statusConfig[status];

  const sizeConfig = {
    small: { fontSize: '0.75rem', padding: '4px 8px' },
    medium: { fontSize: '0.875rem', padding: '6px 12px' },
    large: { fontSize: '1rem', padding: '8px 16px' }
  };

  const currentSize = sizeConfig[size];

  if (variant === 'indicator') {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <Box sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: backgroundColor,
          border: `2px solid ${textColor}`
        }} />
        {showLabel && (
          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
            {config.label}
          </Typography>
        )}
      </Box>
    );
  }

  if (variant === 'card') {
    return (
      <Box sx={{
        backgroundColor: backgroundColor,
        color: textColor,
        padding: currentSize.padding,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        minWidth: 120
      }}>
        <Typography sx={{ fontSize: '1.2rem' }}>{config.icon}</Typography>
        {showLabel && (
          <Typography sx={{
            fontSize: currentSize.fontSize,
            fontWeight: 500
          }}>
            {config.label}
          </Typography>
        )}
      </Box>
    );
  }

  // Default chip variant
  return (
    <Chip
      label={showLabel ? config.label : config.icon}
      size={size === 'large' ? 'medium' : size}
      sx={{
        backgroundColor: backgroundColor,
        color: textColor,
        fontWeight: 500,
        '& .MuiChip-label': {
          fontSize: currentSize.fontSize
        }
      }}
    />
  );
};

export default AttendanceStatus;
