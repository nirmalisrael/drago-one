import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  alpha,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Palette as PaletteIcon, Check as CheckIcon } from '@mui/icons-material';

// Use your own context/hook that supplies theme data, e.g.:
import { useTheme } from '../../hooks/useTheme';

export const ThemeSettings: React.FC = () => {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <PaletteIcon />
          <Typography variant="h6">Theme Selection</Typography>
          <Chip
            label={availableThemes[currentTheme].displayName}
            size="small"
            color="primary"
          />
        </Box>

        <Grid container spacing={3}>
          {Object.values(availableThemes).map((theme) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={theme.name}>
              <Card
                aria-pressed={currentTheme === theme.name}
                tabIndex={0}
                sx={{
                  cursor: 'pointer',
                  border: currentTheme === theme.name ? 2 : 1,
                  borderColor: currentTheme === theme.name
                    ? 'primary.main'
                    : alpha('#000', 0.12),
                  boxShadow: currentTheme === theme.name ? 8 : 1,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
                onClick={() => setTheme(theme.name)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setTheme(theme.name);
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {theme.displayName}
                    </Typography>
                    {currentTheme === theme.name && (
                      <CheckIcon color="primary" fontSize="small" />
                    )}
                  </Box>

                  {/* Color Role Dots with Labels */}
                  <Box display="flex" gap={2} mb={2}>
                    {[
                      { color: theme.colors.primary.main, label: 'Primary' },
                      { color: theme.colors.secondary.main, label: 'Secondary' },
                      { color: theme.colors.background.default, label: 'Bg.' },
                      { color: theme.colors.text.primary, label: 'Text' },
                    ].map(({ color, label }, index) => (
                      <Box key={index + 1} display="flex" flexDirection="column" alignItems="center">
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            backgroundColor: color,
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: alpha('#000', 0.1),
                            mb: 0.5,
                          }}
                        />
                        <Typography variant="caption" color="textSecondary">
                          {label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Live Example Preview */}
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      background: theme.colors.background.default,
                      border: '1px solid',
                      borderColor: alpha(theme.colors.primary.main, 0.15),
                      mb: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                    }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      disableElevation
                      sx={{
                        background: theme.colors.primary.main,
                        color: theme.colors.primary.contrastText,
                        '&:hover': {
                          background: theme.colors.primary.dark,
                        },
                        mb: 1,
                      }}
                    >
                      Example Button
                    </Button>
                    <Chip
                      label="Chip"
                      size="small"
                      sx={{
                        background: theme.colors.secondary.main,
                        color: theme.colors.secondary.contrastText,
                        fontWeight: 500,
                      }}
                    />
                    <Typography
                      sx={{
                        color: theme.colors.text.primary,
                        mt: 1,
                        fontSize: 14,
                      }}
                    >
                      Sample preview text
                    </Typography>
                  </Box>

                  {/* Actions */}
                  {currentTheme === theme.name ? (
                    <Button variant="contained" size="small" fullWidth disabled>
                      Active
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="small"
                      fullWidth
                      onClick={(e) => {
                        e.stopPropagation();
                        setTheme(theme.name);
                      }}
                    >
                      Apply
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ThemeSettings;