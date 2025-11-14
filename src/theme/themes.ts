import type { ThemeConfig } from './types';
import { educationThemes } from './educationThemes';

// Export the new education-focused themes
export const themes: Record<string, ThemeConfig> = {
  ...educationThemes,
};