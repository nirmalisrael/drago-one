import type { EducationTypography } from './types';

// Enhanced typography configuration for education-specific use cases
export const educationTypography: EducationTypography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,

  // Standard Material-UI typography
  h1: {
    fontSize: '2.5rem',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.02em'
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.01em'
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.3
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.4
  },
  h6: {
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.4
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.5
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.5
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.4
  },
  overline: {
    fontSize: '0.625rem',
    lineHeight: 1.5,
    fontWeight: 400,
    letterSpacing: '0.1em',
    textTransform: 'uppercase'
  },

  // Education-specific typography variants
  courseCode: {
    fontFamily: '"JetBrains Mono", "Fira Code", "Monaco", "Consolas", monospace',
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0.05em',
    textTransform: 'uppercase'
  },
  gradeDisplay: {
    fontSize: '1.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '0.02em'
  },
  credential: {
    fontFamily: '"Playfair Display", "Times New Roman", serif',
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: '0.01em'
  },
  academicTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '0.02em'
  },
  studentName: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: '0.01em'
  },
  instructorName: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: '0.01em'
  },
  departmentName: {
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0.05em',
    textTransform: 'uppercase'
  },
  semesterInfo: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.4,
    letterSpacing: '0.01em'
  },
  assignmentTitle: {
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '0.01em'
  },
  examHeader: {
    fontSize: '1.375rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '0.02em'
  },
  transcript: {
    fontFamily: '"Times New Roman", "Georgia", serif',
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: '0.01em'
  },
  certificate: {
    fontFamily: '"Playfair Display", "Times New Roman", serif',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.02em'
  },
};

