import { useTheme } from '@mui/material/styles';

/**
 * Custom hook for accessing education-specific colors from the theme
 * Provides utility functions for getting semantic colors based on education context
 */
export const useEducationColors = () => {
  const theme = useTheme();

  return {
    // Attendance colors
    getAttendanceColor: (status: 'present' | 'absent' | 'late' | 'excused' | 'tardy') => {
      return theme.palette.education.attendance[status];
    },

    // Grade colors based on grade value
    getGradeColor: (grade: string | number) => {
      const gradeStr = grade.toString().toUpperCase();

      if (gradeStr.startsWith('A')) return theme.palette.education.grades.excellent;
      if (gradeStr.startsWith('B')) return theme.palette.education.grades.good;
      if (gradeStr.startsWith('C')) return theme.palette.education.grades.average;
      if (gradeStr.startsWith('D')) return theme.palette.education.grades.poor;
      if (gradeStr.startsWith('F')) return theme.palette.education.grades.failing;
      if (gradeStr === 'I') return theme.palette.education.grades.incomplete;
      return theme.palette.education.grades.pending;
    },

    // Department colors
    getDepartmentColor: (department: string) => {
      const deptKey = department.toLowerCase() as keyof typeof theme.palette.education.departments;
      return theme.palette.education.departments[deptKey] || theme.palette.primary.main;
    },

    // Status colors
    getStatusColor: (status: 'active' | 'inactive' | 'pending' | 'archived' | 'draft' | 'published') => {
      return theme.palette.education.status[status];
    },

    // Academic element colors
    getAcademicColor: (element: 'semester' | 'course' | 'assignment' | 'exam' | 'project') => {
      return theme.palette.education.academic[element];
    },

    // Utility function to get contrast text color
    getContrastText: (backgroundColor: string) => {
      // Simple contrast calculation - in a real app, you might want to use a more sophisticated method
      const hex = backgroundColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 128 ? '#000000' : '#ffffff';
    }
  };
};

