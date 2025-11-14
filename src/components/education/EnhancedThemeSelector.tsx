import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  alpha
} from '@mui/material';
import {
  Palette as PaletteIcon,
  Check as CheckIcon,
  ExpandMore as ExpandMoreIcon,
  Accessibility as AccessibilityIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useTheme } from '@/hooks/useTheme';
import { useTheme as useMuiTheme } from '@mui/material/styles';

const EnhancedThemeSelector: React.FC = () => {
  const muiTheme = useMuiTheme();
  const { currentTheme: currentThemeName, setTheme: setThemeName, availableThemes: themes } = useTheme();
  const [expandedCategory, setExpandedCategory] = useState<string | false>('professionalAcademic');

  // Group themes by category
  const themesByCategory = Object.values(themes).reduce((acc, theme) => {
    if (!acc[theme.category]) {
      acc[theme.category] = [];
    }
    acc[theme.category].push(theme);
    return acc;
  }, {} as Record<string, any[]>);

  const categoryConfig = {
    professionalAcademic: {
      title: 'Professional Academic',
      icon: <SchoolIcon />,
      description: 'Traditional and professional themes for academic institutions'
    },
    departmentSpecific: {
      title: 'Department Specific',
      icon: <CategoryIcon />,
      description: 'Themes tailored for specific academic departments'
    },
    accessibility: {
      title: 'Accessibility',
      icon: <AccessibilityIcon />,
      description: 'High contrast and accessibility-focused themes'
    },
    roleBased: {
      title: 'Role Based',
      icon: <PersonIcon />,
      description: 'Themes optimized for different user roles'
    },
    personalPreference: {
      title: 'Personal Preference',
      icon: <PaletteIcon />,
      description: 'Customizable themes for personal preference'
    }
  };

  const getAccessibilityInfo = (theme: any) => {
    const info = [];
    if (theme.accessibility.contrastLevel === 'high' || theme.accessibility.contrastLevel === 'maximum') {
      info.push('High Contrast');
    }
    if (theme.accessibility.colorblindFriendly) {
      info.push('Colorblind Friendly');
    }
    if (theme.accessibility.largeText) {
      info.push('Large Text');
    }
    if (theme.accessibility.reducedMotion) {
      info.push('Reduced Motion');
    }
    return info;
  };

  const handleCategoryChange = (category: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedCategory(isExpanded ? category : false);
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <PaletteIcon />
          <Typography variant="h6">Enhanced Theme Selection</Typography>
          <Chip
            label={themes[currentThemeName]?.displayName || 'Unknown Theme'}
            size="small"
            color="primary"
            icon={<CheckIcon />}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Choose from our carefully curated collection of education-focused themes. Each theme is designed with specific use cases and accessibility considerations in mind.
        </Typography>

        <Box>
          {Object.entries(themesByCategory).map(([category, categoryThemes]) => {
            const config = categoryConfig[category as keyof typeof categoryConfig];

            return (
              <Accordion
                key={category}
                expanded={expandedCategory === category}
                onChange={handleCategoryChange(category)}
                sx={{ mb: 1 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Box sx={{ color: 'primary.main' }}>
                      {config.icon}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {config.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {config.description}
                      </Typography>
                    </Box>
                    <Chip
                      label={`${categoryThemes.length} themes`}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </AccordionSummary>

                <AccordionDetails>
                  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    {categoryThemes.map((theme) => (
                      <Box key={theme.name} sx={{ flex: '1 1 350px', minWidth: 350, maxWidth: 400 }}>
                        <Card
                          sx={{
                            cursor: 'pointer',
                            border: currentThemeName === theme.name ? 2 : 1,
                            borderColor: currentThemeName === theme.name ? 'primary.main' : 'divider',
                            boxShadow: currentThemeName === theme.name ? 4 : 1,
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: 3,
                            },
                            transition: 'all 0.2s ease-in-out',
                            position: 'relative'
                          }}
                          onClick={() => setThemeName(theme.name)}
                        >
                          {currentThemeName === theme.name && (
                            <Box sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              backgroundColor: 'primary.main',
                              color: 'white',
                              borderRadius: '50%',
                              width: 24,
                              height: 24,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              zIndex: 1
                            }}>
                              <CheckIcon sx={{ fontSize: 16 }} />
                            </Box>
                          )}

                          <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                              <Typography variant="subtitle1" fontWeight="medium">
                                {theme.displayName}
                              </Typography>
                            </Box>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              {theme.description}
                            </Typography>

                            {/* Target Audience */}
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                                Target Audience:
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                {theme.targetAudience.map((audience: string) => (
                                  <Chip
                                    key={audience}
                                    label={audience}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.75rem' }}
                                  />
                                ))}
                              </Box>
                            </Box>

                            {/* Accessibility Features */}
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                                Accessibility:
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                {getAccessibilityInfo(theme).map((feature) => (
                                  <Chip
                                    key={feature}
                                    label={feature}
                                    size="small"
                                    sx={{
                                      fontSize: '0.75rem',
                                      backgroundColor: alpha(muiTheme.palette.success.main, 0.1),
                                      color: muiTheme.palette.success.main
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>

                            {/* Color Preview */}
                            <Box display="flex" gap={1} mb={2}>
                              {[
                                { color: theme.colors.primary.main, label: 'Primary' },
                                { color: theme.colors.secondary.main, label: 'Secondary' },
                                { color: theme.colors.background.default, label: 'Bg' },
                                { color: theme.colors.text.primary, label: 'Text' },
                              ].map(({ color, label }, index) => (
                                <Tooltip key={index} title={label}>
                                  <Box
                                    sx={{
                                      width: 24,
                                      height: 24,
                                      backgroundColor: color,
                                      borderRadius: 1,
                                      border: '1px solid',
                                      borderColor: alpha('#000', 0.1),
                                    }}
                                  />
                                </Tooltip>
                              ))}
                            </Box>

                            {/* Actions */}
                            {currentThemeName === theme.name ? (
                              <Button variant="contained" size="small" fullWidth disabled>
                                Active Theme
                              </Button>
                            ) : (
                              <Button
                                variant="outlined"
                                size="small"
                                fullWidth
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setThemeName(theme.name);
                                }}
                              >
                                Apply Theme
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      </Box>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>

        {/* Theme Information */}
        <Box sx={{
          mt: 4,
          p: 2,
          backgroundColor: 'background.elevated',
          borderRadius: 2,
          border: `1px solid ${muiTheme.palette.divider}`
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <InfoIcon color="primary" />
            <Typography variant="subtitle2" fontWeight={600}>
              Theme Information
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            All themes in this collection are designed specifically for educational environments and include
            comprehensive accessibility features, semantic color systems, and education-focused typography variants.
            Themes are organized by purpose to help you find the perfect fit for your institution's needs.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EnhancedThemeSelector;
