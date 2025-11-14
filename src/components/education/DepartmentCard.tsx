import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { useEducationColors } from '@/hooks/useEducationColors';
import { useTheme } from '@mui/material/styles';

interface DepartmentCardProps {
  department: string;
  title?: string;
  description?: string;
  studentCount?: number;
  courseCount?: number;
  variant?: 'default' | 'compact' | 'detailed';
  onClick?: () => void;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({
  department,
  title,
  description,
  studentCount,
  courseCount,
  variant = 'default',
  onClick
}) => {
  const { getDepartmentColor } = useEducationColors();
  const theme = useTheme();

  const departmentColor = getDepartmentColor(department);
  const departmentConfig = {
    science: { icon: '🔬', label: 'Science' },
    arts: { icon: '🎨', label: 'Arts' },
    business: { icon: '💼', label: 'Business' },
    humanities: { icon: '📚', label: 'Humanities' },
    engineering: { icon: '⚙️', label: 'Engineering' },
    health: { icon: '🏥', label: 'Health' }
  };

  const config = departmentConfig[department.toLowerCase() as keyof typeof departmentConfig] || {
    icon: '🎓',
    label: department
  };

  if (variant === 'compact') {
    return (
      <Card
        sx={{
          cursor: onClick ? 'pointer' : 'default',
          borderLeft: `4px solid ${departmentColor}`,
          '&:hover': onClick ? { transform: 'translateY(-2px)', boxShadow: 4 } : {},
          transition: 'all 0.2s ease-in-out'
        }}
        onClick={onClick}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: '1.5rem' }}>{config.icon}</Typography>
            <Typography variant="subtitle1" fontWeight={600}>
              {config.label}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'detailed') {
    return (
      <Card
        sx={{
          cursor: onClick ? 'pointer' : 'default',
          borderLeft: `4px solid ${departmentColor}`,
          '&:hover': onClick ? { transform: 'translateY(-2px)', boxShadow: 4 } : {},
          transition: 'all 0.2s ease-in-out'
        }}
        onClick={onClick}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography sx={{ fontSize: '2rem' }}>{config.icon}</Typography>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {title || config.label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description || `${department} Department`}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {studentCount !== undefined && (
              <Chip
                label={`${studentCount} Students`}
                size="small"
                sx={{ backgroundColor: departmentColor, color: 'white' }}
              />
            )}
            {courseCount !== undefined && (
              <Chip
                label={`${courseCount} Courses`}
                size="small"
                variant="outlined"
                sx={{ borderColor: departmentColor, color: departmentColor }}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        borderLeft: `4px solid ${departmentColor}`,
        '&:hover': onClick ? { transform: 'translateY(-2px)', boxShadow: 4 } : {},
        transition: 'all 0.2s ease-in-out'
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography sx={{ fontSize: '1.5rem' }}>{config.icon}</Typography>
          <Typography variant="subtitle1" fontWeight={600}>
            {config.label}
          </Typography>
        </Box>

        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {description}
          </Typography>
        )}

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {studentCount !== undefined && (
            <Chip
              label={`${studentCount} Students`}
              size="small"
              sx={{ backgroundColor: departmentColor, color: 'white' }}
            />
          )}
          {courseCount !== undefined && (
            <Chip
              label={`${courseCount} Courses`}
              size="small"
              variant="outlined"
              sx={{ borderColor: departmentColor, color: departmentColor }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DepartmentCard;

