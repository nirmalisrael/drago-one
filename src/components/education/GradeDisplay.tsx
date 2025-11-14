import React from 'react';
import { Box, Chip, Typography, CircularProgress } from '@mui/material';
import { useEducationColors } from '@/hooks/useEducationColors';

interface GradeDisplayProps {
  grade: string | number;
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'chip' | 'display' | 'circular' | 'badge';
  maxGrade?: number; // For percentage-based grades
}

const GradeDisplay: React.FC<GradeDisplayProps> = ({
  grade,
  showLabel = true,
  size = 'medium',
  variant = 'chip',
  maxGrade = 100
}) => {
  const { getGradeColor, getContrastText } = useEducationColors();

  const gradeStr = grade.toString();
  const backgroundColor = getGradeColor(grade);
  const textColor = getContrastText(backgroundColor);

  const sizeConfig = {
    small: {
      fontSize: '0.75rem',
      padding: '4px 8px',
      chipSize: 'small',
      displaySize: '1rem',
      circularSize: 40
    },
    medium: {
      fontSize: '0.875rem',
      padding: '6px 12px',
      chipSize: 'medium',
      displaySize: '1.5rem',
      circularSize: 60
    },
    large: {
      fontSize: '1rem',
      padding: '8px 16px',
      chipSize: 'large',
      displaySize: '2rem',
      circularSize: 80
    }
  };

  const currentSize = sizeConfig[size];

  // Calculate percentage for circular progress
  const percentage = typeof grade === 'number' ? (grade / maxGrade) * 100 : 0;

  if (variant === 'display') {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5
      }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: currentSize.displaySize,
            fontWeight: 700,
            color: backgroundColor,
            textAlign: 'center',
            lineHeight: 1
          }}
        >
          {gradeStr}
        </Typography>
        {showLabel && (
          <Typography variant="caption" color="text.secondary">
            Grade
          </Typography>
        )}
      </Box>
    );
  }

  if (variant === 'circular' && typeof grade === 'number') {
    return (
      <Box sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={currentSize.circularSize}
          thickness={4}
          sx={{
            color: backgroundColor,
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            }
          }}
        />
        <Box sx={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography
            variant="caption"
            sx={{
              fontSize: currentSize.fontSize,
              fontWeight: 600,
              color: backgroundColor
            }}
          >
            {gradeStr}
          </Typography>
          {showLabel && (
            <Typography
              variant="caption"
              sx={{
                fontSize: '0.625rem',
                color: 'text.secondary'
              }}
            >
              /{maxGrade}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

  if (variant === 'badge') {
    return (
      <Box sx={{
        backgroundColor: backgroundColor,
        color: textColor,
        padding: currentSize.padding,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: currentSize.circularSize,
        minHeight: currentSize.circularSize,
        fontWeight: 700
      }}>
        <Typography sx={{ fontSize: currentSize.fontSize }}>
          {gradeStr}
        </Typography>
      </Box>
    );
  }

  // Default chip variant
  return (
    <Chip
      label={gradeStr}
      size={currentSize.chipSize as any}
      sx={{
        backgroundColor: backgroundColor,
        color: textColor,
        fontWeight: 600,
        '& .MuiChip-label': {
          fontSize: currentSize.fontSize
        }
      }}
    />
  );
};

export default GradeDisplay;
