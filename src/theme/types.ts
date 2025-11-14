// Modern theme system with organized categorization
export type ThemeCategory =
  | 'professionalAcademic'    // Professional academic themes
  | 'departmentSpecific'     // Department-specific themes
  | 'accessibility'          // Accessibility-focused themes
  | 'roleBased'             // Role-based themes
  | 'personalPreference';   // Personal preference themes

export type ThemeMode = 'light' | 'dark';
export type ThemeName =
  // Professional Academic Themes
  | 'academicExcellence'
  | 'professionalBlue'
  | 'scholarlyNavy'
  | 'institutionalGray'

  // Department-Specific Themes
  | 'scienceLab'
  | 'artsStudio'
  | 'businessSuite'
  | 'humanitiesLibrary'

  // Accessibility Themes
  | 'highContrast'
  | 'colorblindFriendly'
  | 'largeText'
  | 'reducedMotion'

  // Role-Based Themes
  | 'studentFocused'
  | 'teacherOptimized'
  | 'adminDashboard'

  // Personal Preference Themes
  | 'calmMinimal'
  | 'energeticVibrant'
  | 'warmComfortable';

// Enhanced ThemeConfig interface with education-specific features
export interface ThemeConfig {
  name: ThemeName;
  displayName: string;
  category: ThemeCategory;
  description: string;
  targetAudience: string[];
  accessibility: {
    contrastLevel: 'standard' | 'high' | 'maximum';
    colorblindFriendly: boolean;
    reducedMotion: boolean;
    largeText: boolean;
  };
  colors: {
    // Core Material-UI colors
    primary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    secondary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    success: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    error: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    warning: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    info: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    // Education-specific semantic colors
    education: {
      attendance: {
        present: string;
        absent: string;
        late: string;
        excused: string;
        tardy: string;
      };
      grades: {
        excellent: string;  // A, A+
        good: string;       // B, B+
        average: string;    // C, C+
        poor: string;       // D, D+
        failing: string;    // F
        incomplete: string; // I
        pending: string;    // Pending
      };
      status: {
        active: string;
        inactive: string;
        pending: string;
        archived: string;
        draft: string;
        published: string;
      };
      departments: {
        science: string;
        arts: string;
        business: string;
        humanities: string;
        engineering: string;
        health: string;
      };
      academic: {
        semester: string;
        course: string;
        assignment: string;
        exam: string;
        project: string;
      };
    };
    background: {
      default: string;
      paper: string;
      elevated: string;
      overlay: string;
    };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      hint: string;
    };
    divider: string;
    action: {
      hover: string;
      selected: string;
      disabled: string;
      focus: string;
    };
    surface: {
      low: string;    // Cards, modals
      medium: string; // Sections, containers
      high: string;   // Headers, toolbars
    };
    grey: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  };
}

// Enhanced typography interface for education-specific use cases
export interface EducationTypography {
  fontFamily: string;
  fontSize: number;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;

  // Standard Material-UI typography
  h1: TypographyVariant;
  h2: TypographyVariant;
  h3: TypographyVariant;
  h4: TypographyVariant;
  h5: TypographyVariant;
  h6: TypographyVariant;
  body1: TypographyVariant;
  body2: TypographyVariant;
  caption: TypographyVariant;
  overline: TypographyVariant;

  // Education-specific typography variants
  courseCode: TypographyVariant;
  gradeDisplay: TypographyVariant;
  credential: TypographyVariant;
  academicTitle: TypographyVariant;
  studentName: TypographyVariant;
  instructorName: TypographyVariant;
  departmentName: TypographyVariant;
  semesterInfo: TypographyVariant;
  assignmentTitle: TypographyVariant;
  examHeader: TypographyVariant;
  transcript: TypographyVariant;
  certificate: TypographyVariant;
}

interface TypographyVariant {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: number;
  lineHeight?: number;
  letterSpacing?: string;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

// Enhanced ExtendedTheme configuration for Material-UI with education features
export interface ExtendedTheme {
  palette: {
    mode: ThemeMode;
    primary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    secondary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    success: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    error: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    warning: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    info: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    background: {
      default: string;
      paper: string;
      elevated: string;
      overlay: string;
    };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      hint: string;
    };
    divider: string;
    action: {
      hover: string;
      selected: string;
      disabled: string;
      focus: string;
    };
    surface: {
      low: string;
      medium: string;
      high: string;
    };
    // Education-specific palette extensions
    education: {
      attendance: {
        present: string;
        absent: string;
        late: string;
        excused: string;
        tardy: string;
      };
      grades: {
        excellent: string;
        good: string;
        average: string;
        poor: string;
        failing: string;
        incomplete: string;
        pending: string;
      };
      status: {
        active: string;
        inactive: string;
        pending: string;
        archived: string;
        draft: string;
        published: string;
      };
      departments: {
        science: string;
        arts: string;
        business: string;
        humanities: string;
        engineering: string;
        health: string;
      };
      academic: {
        semester: string;
        course: string;
        assignment: string;
        exam: string;
        project: string;
      };
    };
    grey: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  };
  typography: EducationTypography;
}

// Utility type for theme creation
export interface ThemeOptions extends Partial<ExtendedTheme> {
  name: string;
  displayName: string;
}

declare module '@mui/material/styles' {
  interface Palette {
    surface: {
      low: string;
      medium: string;
      high: string;
    };
    education: {
      attendance: {
        present: string;
        absent: string;
        late: string;
        excused: string;
        tardy: string;
      };
      grades: {
        excellent: string;
        good: string;
        average: string;
        poor: string;
        failing: string;
        incomplete: string;
        pending: string;
      };
      status: {
        active: string;
        inactive: string;
        pending: string;
        archived: string;
        draft: string;
        published: string;
      };
      departments: {
        science: string;
        arts: string;
        business: string;
        humanities: string;
        engineering: string;
        health: string;
      };
      academic: {
        semester: string;
        course: string;
        assignment: string;
        exam: string;
        project: string;
      };
    };
  }

  interface PaletteOptions {
    surface?: {
      low?: string;
      medium?: string;
      high?: string;
    };
    education?: {
      attendance?: {
        present?: string;
        absent?: string;
        late?: string;
        excused?: string;
        tardy?: string;
      };
      grades?: {
        excellent?: string;
        good?: string;
        average?: string;
        poor?: string;
        failing?: string;
        incomplete?: string;
        pending?: string;
      };
      status?: {
        active?: string;
        inactive?: string;
        pending?: string;
        archived?: string;
        draft?: string;
        published?: string;
      };
      departments?: {
        science?: string;
        arts?: string;
        business?: string;
        humanities?: string;
        engineering?: string;
        health?: string;
      };
      academic?: {
        semester?: string;
        course?: string;
        assignment?: string;
        exam?: string;
        project?: string;
      };
    };
  }

  interface TypeBackground {
    elevated: string;
    overlay: string;
  }

  interface TypeText {
    hint: string;
  }

  interface TypeAction {
    focus: string;
  }
}