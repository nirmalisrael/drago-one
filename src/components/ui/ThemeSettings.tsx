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

        <Grid container spacing={2}>
          {Object.values(availableThemes).map((theme) => (
            <Grid size={{ xs: 12, sm: 3 }} key={theme.name}>
              <Card
                sx={{
                  cursor: 'pointer',
                  border: currentTheme === theme.name ? 2 : 1,
                  borderColor: currentTheme === theme.name
                    ? 'primary.main'
                    : alpha('#000', 0.12),
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
                onClick={() => setTheme(theme.name)}
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

                  {/* Color Preview */}
                  <Box display="flex" gap={0.5} mb={2}>
                    {[
                      theme.colors.primary.main,
                      theme.colors.primary.light,
                      theme.colors.secondary.main,
                      theme.colors.text.primary,
                    ].map((color, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 24,
                          height: 24,
                          backgroundColor: color,
                          borderRadius: 1,
                          border: '1px solid',
                          borderColor: alpha('#000', 0.1),
                        }}
                      />
                    ))}
                  </Box>

                  <Button
                    variant={currentTheme === theme.name ? "contained" : "outlined"}
                    size="small"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      setTheme(theme.name);
                    }}
                  >
                    {currentTheme === theme.name ? 'Active' : 'Apply'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};