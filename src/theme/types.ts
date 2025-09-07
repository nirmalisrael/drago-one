export type ThemeName = 'blueEclipse' | 'ocean' | 'sunset' | 'forest'
  | 'midnight' | 'royal' | 'stormyMorning' | 'saltAndPepper' | 'calmBlue' | 'underTheMoonlight'
  | 'emeraldOdyssey';

export interface ThemeConfig {
  name: ThemeName;
  displayName: string;
  colors: {
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
    background: {
      default: string;
      paper: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    divider: string;
  };
}