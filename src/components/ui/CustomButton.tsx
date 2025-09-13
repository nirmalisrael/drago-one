// src/components/ui/buttons/Button/Button.tsx
import React from 'react';
import {
  Button as MUIButton,
  CircularProgress,
  Tooltip,
  useTheme,
  alpha,
  type ButtonProps as MUIButtonProps,
  Box,
} from '@mui/material';
import { Controller, type Control } from 'react-hook-form';

// Define custom props with action-based types
interface CustomButtonProps {
  // Loading & State
  isLoading?: boolean;
  disabled?: boolean;

  // Content
  text?: string;
  children?: React.ReactNode;
  tooltip?: string;

  // Action-Based Button Types
  type?:
  | 'submit'      // Form submission - primary blue
  | 'cancel'      // Cancel action - neutral gray
  | 'add'         // Create/Add - success green
  | 'edit'        // Edit/Update - info blue
  | 'delete'      // Delete/Remove - error red
  | 'save'        // Save changes - success green
  | 'reset'       // Reset form - warning orange
  | 'search'      // Search action - info blue
  | 'filter'      // Filter data - secondary purple
  | 'export'      // Export data - info blue
  | 'import'      // Import data - warning orange
  | 'approve'     // Approve action - success green
  | 'reject'      // Reject action - error red
  | 'view'        // View details - neutral
  | 'download'    // Download - info blue
  | 'upload'      // Upload - warning orange
  | 'print'       // Print - neutral
  | 'send'        // Send/Email - primary blue
  | 'back'        // Go back - neutral
  | 'next'        // Next step - primary blue
  | 'finish'      // Complete process - success green
  | 'close'       // Close dialog - neutral
  | 'confirm'     // Confirm action - primary blue
  | 'primary'     // Fallback primary
  | 'secondary'   // Fallback secondary
  | 'neutral';    // Neutral action

  variant?: 'text' | 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';

  // Form Integration
  name?: string;
  control?: Control<any>;
  htmlType?: 'button' | 'submit' | 'reset';

  // Styling & Layout
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sx?: object;

  // Events
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  // Advanced Props
  disableElevation?: boolean;
  disableRipple?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  // Loading & State
  isLoading = false,
  disabled = false,

  // Content
  text,
  children,
  tooltip,

  // Button Types & Variants
  type = 'primary',
  variant = 'contained',
  size = 'medium',

  // Form Integration
  name,
  control,
  htmlType = 'button',

  // Styling & Layout
  fullWidth = false,
  startIcon,
  endIcon,
  sx,

  // Events
  onClick,

  // Advanced Props
  disableElevation = false,
  disableRipple = false,
}) => {
  const theme = useTheme();

  // Map action-based type to MUI color and get appropriate styling
  const getButtonConfig = (): {
    color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
    defaultVariant?: 'text' | 'contained' | 'outlined';
    semanticStyles?: object;
  } => {
    switch (type) {
      // Primary Actions
      case 'submit':
      case 'confirm':
      case 'send':
      case 'next':
        return {
          color: 'primary',
          defaultVariant: 'contained',
          semanticStyles: {
            fontWeight: theme.typography.fontWeightBold || 600
          }
        };

      // Success Actions  
      case 'add':
      case 'save':
      case 'approve':
      case 'finish':
        return {
          color: 'secondary',
          defaultVariant: 'contained',
          semanticStyles: {
            fontWeight: theme.typography.fontWeightBold || 600,
          }
        };

      // Destructive Actions
      case 'delete':
      case 'reject':
        return {
          color: 'error',
          defaultVariant: 'contained',
          semanticStyles: {
            fontWeight: theme.typography.fontWeightBold || 600,
            '&:hover': {
              backgroundColor: theme.palette.error.dark,
            }
          }
        };

      // Information/Navigation Actions
      case 'edit':
      case 'search':
      case 'export':
      case 'download':
      case 'view':
        return {
          color: 'info',
          defaultVariant: 'contained'
        };

      // Warning/Caution Actions
      case 'reset':
      case 'import':
      case 'upload':
        return {
          color: 'warning',
          defaultVariant: 'contained'
        };

      // Secondary Actions
      case 'filter':
        return {
          color: 'secondary',
          defaultVariant: 'outlined'
        };

      // Neutral/Cancel Actions
      case 'cancel':
      case 'back':
      case 'close':
      case 'print':
      case 'neutral':
        return {
          color: 'secondary',
          defaultVariant: 'contained',
          semanticStyles: {
            color: theme.palette.text.primary,
            fontWeight: theme.typography.fontWeightBold || 600,
            borderColor: theme.palette.divider,
            backgroundColor: alpha(theme.palette.primary.light, 0.2),
            transition: theme.transitions?.create?.(['background-color', 'transform'], {
              duration: theme.transitions?.duration?.short || 200,
            }),
            '&:hover': {
              backgroundColor: alpha(theme.palette.text.secondary, 0.04),
              borderColor: theme.palette.text.secondary,
            }
          }
        };

      // Fallbacks
      case 'primary':
        return { color: 'primary', defaultVariant: 'contained' };
      case 'secondary':
        return { color: 'secondary', defaultVariant: 'outlined' };

      default:
        return { color: 'primary', defaultVariant: 'contained' };
    }
  };

  const buttonConfig = getButtonConfig();
  const finalVariant = variant || buttonConfig.defaultVariant || 'contained';

  // Auto-set htmlType based on button type
  const getHtmlType = (): 'button' | 'submit' | 'reset' => {
    if (htmlType !== 'button') return htmlType;

    switch (type) {
      case 'submit':
      case 'save':
      case 'confirm':
        return 'submit';
      case 'reset':
        return 'reset';
      default:
        return 'button';
    }
  };

  // Get default text based on button type if no text/children provided
  const getDefaultText = (): string => {
    if (children || text) return text || '';

    switch (type) {
      case 'submit': return 'Submit';
      case 'cancel': return 'Cancel';
      case 'add': return 'Add';
      case 'edit': return 'Edit';
      case 'delete': return 'Delete';
      case 'save': return 'Save';
      case 'reset': return 'Reset';
      case 'search': return 'Search';
      case 'filter': return 'Filter';
      case 'export': return 'Export';
      case 'import': return 'Import';
      case 'approve': return 'Approve';
      case 'reject': return 'Reject';
      case 'view': return 'View';
      case 'download': return 'Download';
      case 'upload': return 'Upload';
      case 'print': return 'Print';
      case 'send': return 'Send';
      case 'back': return 'Back';
      case 'next': return 'Next';
      case 'finish': return 'Finish';
      case 'close': return 'Close';
      case 'confirm': return 'Confirm';
      default: return 'Button';
    }
  };

  // Custom theme-aware styling
  const getCustomSx = () => {
    const baseStyles = {
      fontWeight: theme.typography.fontWeightMedium || 500,
      textTransform: 'none' as const,
      borderRadius: theme.shape?.borderRadius || 8,
      position: 'relative' as const,
      paddingX: size === 'small' ? 2 : size === 'large' ? 3 : 2.5,

      // Apply semantic styles from button config
      ...buttonConfig.semanticStyles,

      // Loading state styling
      ...(isLoading && {
        color: 'transparent',
        pointerEvents: 'none' as const,
      }),

      // Disabled state styling
      ...(disabled && !isLoading && {
        cursor: 'not-allowed',
        opacity: 0.6,
      }),

      // Enhanced hover effects
      ...(!disabled && !isLoading && {
        transition: theme.transitions?.create ? theme.transitions.create(['background-color', 'transform'], {
          duration: theme.transitions?.duration?.short || 200,
        }) : 'all 0.2s ease-in-out',

        '&:hover': {
          transform: 'translateY(-1px)',
          ...(finalVariant === 'contained' && {
            boxShadow: theme.shadows?.[4] || '0 4px 8px rgba(0,0,0,0.12)',
          }),
          ...(finalVariant === 'outlined' && {
            backgroundColor: alpha(theme.palette[buttonConfig.color].main, 0.04),
            borderWidth: 2,
          }),
          ...(finalVariant === 'text' && {
            backgroundColor: alpha(theme.palette[buttonConfig.color].main, 0.08),
          }),
        },

        '&:active': {
          transform: 'translateY(0px)',
        },
      }),
    };

    return { ...baseStyles, ...sx };
  };

  // Button content with loading spinner
  const buttonContent = (
    <>
      {/* Loading Spinner */}
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress
            size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
            sx={{
              color: finalVariant === 'contained'
                ? (theme.palette.common?.white || '#ffffff')
                : theme.palette[buttonConfig.color].main,
            }}
          />
        </Box>
      )}

      {/* Button Text/Content */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing(1),
          visibility: isLoading ? 'hidden' : 'visible',
        }}
      >
        {startIcon}
        {children || text || getDefaultText()}
        {endIcon}
      </Box>
    </>
  );

  // Button props for MUI Button
  const muiButtonProps: MUIButtonProps = {
    variant: finalVariant,
    color: buttonConfig.color,
    size,
    fullWidth,
    disabled: disabled || isLoading,
    type: getHtmlType(),
    name,
    onClick,
    disableElevation,
    disableRipple,
    sx: getCustomSx(),
  };

  if (control && name) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MUIButton {...muiButtonProps} onClick={field.onChange}>
            {buttonContent}
          </MUIButton>
        )}
      />
    );
  }

  // Render with or without tooltip
  if (tooltip) {
    return (
      <Tooltip
        title={tooltip}
        arrow
        placement="top"
        sx={{
          '& .MuiTooltip-tooltip': {
            fontSize: '12px',
            backgroundColor: theme.palette.grey?.[800] || '#1f2937',
            color: theme.palette.common?.white || '#ffffff',
            borderRadius: theme.shape?.borderRadius || '6px',
            padding: '8px 12px',
            fontFamily: theme.typography.fontFamily || 'Inter, sans-serif',
          },
          '& .MuiTooltip-arrow': {
            color: theme.palette.grey?.[800] || '#1f2937',
          }
        }}
      >
        <span>
          <MUIButton {...muiButtonProps}>
            {buttonContent}
          </MUIButton>
        </span>
      </Tooltip>
    );
  }

  return (
    <MUIButton {...muiButtonProps}>
      {buttonContent}
    </MUIButton>
  );
};

export default CustomButton;