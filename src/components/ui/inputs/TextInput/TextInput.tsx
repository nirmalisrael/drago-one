// src/components/ui/inputs/TextInput/TextInput.tsx
import React from 'react';
import {
  TextField,
  Box,
  FormHelperText,
  useTheme,
  alpha,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Controller, type Control, type FieldError } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// TypeScript interfaces
interface TextInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'url' | 'search' | 'password' | 'number';
  required?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  helperText?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  error?: FieldError;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  sx?: object;
  customRules?: object;
  autoFocus?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  required = false,
  disabled = false,
  multiline = false,
  rows = 1,
  maxLength,
  helperText,
  variant = 'outlined',
  size = 'small',
  fullWidth = true,
  error,
  startAdornment,
  endAdornment,
  sx,
  customRules,
  autoFocus,
}) => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = React.useState(false);

  // Custom styling using correct theme properties
  const customStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.shape?.borderRadius || 8,
      fontSize: theme.typography.body2.fontSize,
      transition: theme.transitions?.create?.([
        'border-color',
        'background-color',
        'box-shadow',
      ], {
        duration: theme.transitions?.duration?.short || '200ms',
      }),
      '&:hover:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled)': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: alpha(theme.palette.primary.main, 0.8),
          borderWidth: '1px',
        },
      },
      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
          borderWidth: '2px',
        },
        backgroundColor: alpha(theme.palette.primary.main, 0.02),
        boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)}`,
      },
      '&.Mui-error': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.error.main,
        },
      },
      '&.Mui-disabled': {
        backgroundColor: alpha(theme.palette.text.disabled, 0.05),
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.text.disabled,
        },
      },
    },
    '& .MuiInputBase-input': {
      padding: size === 'small'
        ? theme.spacing(1.25, 1.5)
        : theme.spacing(1.5, 2),
      fontSize: theme.typography.body2.fontSize,
      lineHeight: theme.typography.body2.lineHeight,
      color: theme.palette.text.primary,
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightRegular || 400,
      '&::placeholder': {
        color: theme.palette.text.disabled,
        fontSize: theme.typography.body2.fontSize,
        opacity: 1,
      },
      '&.Mui-disabled': {
        color: theme.palette.text.disabled,
        WebkitTextFillColor: theme.palette.text.disabled,
      },
    },
    '& .MuiInputBase-inputMultiline': {
      padding: theme.spacing(1, 1.5),
      fontSize: theme.typography.body2.fontSize,
      lineHeight: theme.typography.body2.lineHeight,
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.text.secondary,
      fontSize: theme.typography.caption.fontSize,
      fontWeight: theme.typography.fontWeightMedium || 500,
      fontFamily: theme.typography.fontFamily,
      transform: 'translate(14px, 12px) scale(1)',
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -9px) scale(0.85)',
        fontSize: theme.typography.caption.fontSize,
        fontWeight: theme.typography.fontWeightMedium || 500,
      },
      '&.Mui-focused': {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium || 500,
      },
      '&.Mui-error': {
        color: theme.palette.error.main,
      },
      '&.Mui-disabled': {
        color: theme.palette.text.disabled,
      },
    },
    '& .MuiFormHelperText-root': {
      marginLeft: 0,
      marginTop: theme.spacing(0.5),
      fontSize: theme.typography.caption.fontSize,
      lineHeight: theme.typography.caption.lineHeight,
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.text.secondary,
      '&.Mui-error': {
        color: theme.palette.error.main,
      },
      '&.Mui-disabled': {
        color: theme.palette.text.disabled,
      },
    },
    // Adornment styling
    '& .MuiInputAdornment-root': {
      '& .MuiTypography-root': {
        fontSize: theme.typography.body2.fontSize,
        color: theme.palette.text.secondary,
      },
      '& .MuiSvgIcon-root': {
        fontSize: theme.typography.h6.fontSize,
        color: theme.palette.text.secondary,
      },
    },
    ...sx,
  };

  return (
    <Box sx={{ mb: theme.spacing(1.5) }}>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `${label || name} is required` : false,
          maxLength: maxLength
            ? {
              value: maxLength,
              message: `Maximum ${maxLength} characters allowed`,
            }
            : undefined,
          pattern:
            type === 'email'
              ? {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              }
              : undefined,
          ...customRules,
        }}
        render={({ field, fieldState: { error: fieldError } }) => (
          <>
            <TextField
              {...field}
              label={label}
              placeholder={placeholder || `Enter ${label?.toLowerCase() || 'text'}`}
              type={showPassword ? 'text' : type}
              variant={variant}
              size={size}
              fullWidth={fullWidth}
              multiline={multiline}
              rows={multiline ? rows : undefined}
              disabled={disabled}
              error={!!fieldError || !!error}
              sx={customStyles}
              autoFocus={autoFocus}
              InputProps={{
                startAdornment,
                endAdornment: type === 'password' ? (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                      disabled={disabled}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ) : endAdornment,
                inputProps: {
                  maxLength,
                  style: {
                    fontSize: theme.typography.body2.fontSize,
                    fontFamily: theme.typography.fontFamily,
                  },
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {(fieldError || error || helperText) && (
              <FormHelperText
                error={!!fieldError || !!error}
                sx={{
                  ml: 0,
                  mt: theme.spacing(0.375),
                  fontSize: theme.typography.caption.fontSize,
                  lineHeight: theme.typography.caption.lineHeight,
                  color: fieldError || error
                    ? theme.palette.error.main
                    : theme.palette.text.secondary,
                }}
              >
                {fieldError?.message || error?.message || helperText}
              </FormHelperText>
            )}
            {maxLength && field.value && (
              <FormHelperText
                sx={{
                  textAlign: 'right',
                  mt: theme.spacing(0.25),
                  fontSize: '0.75rem', // Use direct value instead of overline
                  color: theme.palette.text.disabled,
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                }}
              >
                {field.value.length}/{maxLength}
              </FormHelperText>
            )}
          </>
        )}
      />
    </Box>
  );
};

export default TextInput;