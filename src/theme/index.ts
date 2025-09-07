import { createContext } from 'react';
import type { themes } from './themes';
import type { ThemeName } from './types';

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (themeName: ThemeName) => void;
  availableThemes: typeof themes;
}

export { themes } from './themes';
export { createAppTheme, LAYOUT_CONFIG } from './themeFactory';
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export type { ThemeName, ThemeConfig } from './types';