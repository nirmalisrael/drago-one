import React, { useState, useCallback, useMemo, useRef, useEffect, type JSX } from 'react';
import {
  TextField,
  Box,
  FormHelperText,
  useTheme,
  alpha,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Chip,
  IconButton,
  Typography,
  type SxProps,
  type Theme,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller, type Control, type FieldError, type FieldValues, type Path, type RegisterOptions } from 'react-hook-form';
import { COUNTRY_CODES, FORMAT_PATTERNS } from '@/constants/form-controls';

interface NumberInputProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  error?: FieldError;
  sx?: SxProps<Theme>;

  // Formatting options
  format?: keyof typeof FORMAT_PATTERNS | string;
  allowDecimal?: boolean;
  allowNegative?: boolean;
  decimalPlaces?: number;

  // Validation options
  min?: number;
  max?: number;
  maxLength?: number;
  customRules?: RegisterOptions<TFormValues, Path<TFormValues>>;

  // Country code options for phone numbers
  showCountryCode?: boolean;
  countryCode?: keyof typeof COUNTRY_CODES;
  allowCountryCodeChange?: boolean;

  // Styling options
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;

  // Event handlers
  onValueChange?: (cleanValue: string, formattedValue: string, rawValue: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;

  // Advanced options
  autoComplete?: string;
  inputMode?: 'numeric' | 'decimal' | 'tel';
  showCharacterCount?: boolean;
  mask?: boolean; // For sensitive data like SSN
}

const NumberInput = <TFormValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  helperText,
  required = false,
  disabled = false,
  readOnly = false,
  variant = 'outlined',
  size = 'small',
  fullWidth = true,
  error,
  sx,

  format,
  allowDecimal = false,
  allowNegative = false,
  decimalPlaces = 2,

  min,
  max,
  maxLength,
  customRules = {},

  showCountryCode = false,
  countryCode = 'IN',
  allowCountryCodeChange = false,

  startAdornment,
  endAdornment,

  onValueChange,
  onFocus,
  onBlur,

  autoComplete = 'off',
  inputMode = 'numeric',
  showCharacterCount = false,
  mask = false,
}: NumberInputProps<TFormValues>): JSX.Element => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState<keyof typeof COUNTRY_CODES>(countryCode);
  const [showMask, setShowMask] = useState(mask);
  const inputRef = useRef<HTMLInputElement>(null);

  // Simple cursor position tracking
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);

  // Get format pattern
  const formatPattern = useMemo(() => {
    if (!format) return null;
    return FORMAT_PATTERNS[format as keyof typeof FORMAT_PATTERNS] || format;
  }, [format]);

  // Simple digit extraction
  const extractDigits = useCallback((value: string): string => {
    return value.replace(/\D/g, '');
  }, []);

  // Get expected digit count
  const getExpectedDigitCount = useCallback(() => {
    if (maxLength) return maxLength;
    if (formatPattern) return formatPattern.replace(/[^#]/g, '').length;
    return null;
  }, [maxLength, formatPattern]);

  // Clean value function - simplified and more predictable
  const cleanValue = useCallback((value: string): string => {
    if (!value) return '';

    let cleaned = value;

    if (formatPattern) {
      // For formatted patterns, just extract digits
      cleaned = extractDigits(value);
    } else {
      // Handle decimal and negative for non-formatted inputs
      if (allowDecimal) {
        // Keep digits, decimal point, and optional minus sign
        cleaned = cleaned.replace(/[^\d.-]/g, '');

        // Handle multiple decimal points
        const parts = cleaned.split('.');
        if (parts.length > 2) {
          cleaned = parts[0] + '.' + parts.slice(1).join('');
        }

        // Limit decimal places
        if (parts.length === 2 && parts[1].length > decimalPlaces) {
          cleaned = parts[0] + '.' + parts[1].slice(0, decimalPlaces);
        }
      } else {
        // Only digits and optional minus sign
        cleaned = cleaned.replace(/[^\d-]/g, '');
      }

      // Handle negative sign positioning
      if (allowNegative && cleaned.includes('-')) {
        const hasNegative = cleaned.startsWith('-');
        cleaned = cleaned.replace(/-/g, '');
        if (hasNegative) cleaned = '-' + cleaned;
      }
    }

    // Apply max length constraint
    if (maxLength) {
      const digits = extractDigits(cleaned);
      if (digits.length > maxLength) {
        if (formatPattern) {
          cleaned = digits.slice(0, maxLength);
        } else {
          const truncatedDigits = digits.slice(0, maxLength);
          if (allowDecimal && cleaned.includes('.')) {
            const beforeDecimal = truncatedDigits.slice(0, -decimalPlaces || truncatedDigits.length);
            const afterDecimal = truncatedDigits.slice(-decimalPlaces || 0);
            cleaned = beforeDecimal + (afterDecimal ? '.' + afterDecimal : '');
          } else {
            cleaned = (allowNegative && cleaned.startsWith('-') ? '-' : '') + truncatedDigits;
          }
        }
      }
    }

    return cleaned;
  }, [formatPattern, extractDigits, allowDecimal, allowNegative, decimalPlaces, maxLength]);

  // Simple pattern application
  const applyPattern = useCallback((digits: string, pattern: string): string => {
    if (!digits || !pattern) return digits;

    let formatted = '';
    let digitIndex = 0;

    for (let i = 0; i < pattern.length && digitIndex < digits.length; i++) {
      if (pattern[i] === '#') {
        formatted += digits[digitIndex];
        digitIndex++;
      } else {
        formatted += pattern[i];
      }
    }

    return formatted;
  }, []);

  // Format value function - simplified
  const formatValue = useCallback((value: string): string => {
    if (!value) return '';

    const cleaned = cleanValue(value);

    if (!formatPattern) {
      return cleaned;
    }

    const digits = extractDigits(cleaned);
    return applyPattern(digits, formatPattern);
  }, [cleanValue, formatPattern, extractDigits, applyPattern]);

  // Simplified cursor position calculation
  const getNewCursorPosition = useCallback((
    oldValue: string,
    newValue: string,
    oldCursor: number,
    isDeleting: boolean
  ): number => {
    if (!formatPattern) {
      // For non-formatted inputs, maintain relative position
      const lengthDiff = newValue.length - oldValue.length;
      return Math.max(0, Math.min(newValue.length, oldCursor + lengthDiff));
    }

    // For formatted inputs, find the next/previous digit position
    if (isDeleting) {
      // Move to previous digit position
      for (let i = oldCursor - 1; i >= 0; i--) {
        if (i < formatPattern.length && formatPattern[i] === '#') {
          return i;
        }
      }
      return 0;
    } else {
      // Move to next digit position or end
      for (let i = oldCursor; i < newValue.length; i++) {
        if (i >= formatPattern.length || formatPattern[i] === '#') {
          return i + 1;
        }
      }
      return newValue.length;
    }
  }, [formatPattern]);

  // Handle input change - greatly simplified
  const handleInputChange = useCallback((
    inputValue: string,
    onChange: (value: string) => void,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const input = event.target;
    const currentCursor = input.selectionStart || 0;
    const oldValue = input.value;
    const isDeleting = inputValue.length < oldValue.length;


    // Clean and format
    const cleaned = cleanValue(inputValue);
    const formatted = formatValue(cleaned);

    const maxLengthValue = getExpectedDigitCount() || max;
    if (!isDeleting && cleaned.length > Number(maxLengthValue)) return;

    // Calculate new cursor position
    const newCursor = getNewCursorPosition(oldValue, formatted, currentCursor, isDeleting);
    setCursorPosition(newCursor);

    // Call handlers
    if (onValueChange) {
      onValueChange(cleaned, formatted, inputValue);
    }

    // Update form with cleaned value
    onChange(cleaned);
  }, [cleanValue, formatValue, getExpectedDigitCount, getNewCursorPosition, max, onValueChange]);

  // Handle cursor position updates
  useEffect(() => {
    if (cursorPosition !== null && inputRef.current) {
      inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      setCursorPosition(null);
    }
  }, [cursorPosition]);

  // Handle focus/blur - simplified
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  // Generate placeholder
  const getPlaceholder = useCallback((): string => {
    if (placeholder) return placeholder;

    if (formatPattern) {
      let example = formatPattern.replace(/#/g, '0');
      if (showCountryCode && format?.includes('PHONE')) {
        example = `${example}`;
      }
      return example;
    }

    const formatExamples: Record<string, string> = {
      'PHONE_IN': '98765 43210',
      'AADHAAR': '1234 5678 9012',
      'CARD': '1234 5678 9012 3456'
    };

    return formatExamples[format as string] || `Enter ${label?.toLowerCase() || 'number'}`;
  }, [placeholder, formatPattern, showCountryCode, format, label]);

  // Validation rules - unchanged but cleaned up
  const getValidationRules = useCallback(() => {
    const rules: RegisterOptions<TFormValues, Path<TFormValues>> = {
      required: required ? `${label || 'This field'} is required` : false,
    };

    if (maxLength) {
      rules.validate = {
        ...rules.validate,
        length: (value: string) => {
          const digitCount = extractDigits(cleanValue(value)).length;
          return digitCount <= maxLength || `Maximum ${maxLength} digits allowed`;
        }
      };
    }

    if (min !== undefined || max !== undefined) {
      rules.validate = {
        ...rules.validate,
        range: (value: string) => {
          const cleaned = cleanValue(value);
          const numValue = allowDecimal ? parseFloat(cleaned) : parseInt(cleaned, 10);

          if (isNaN(numValue)) return true;

          if (min !== undefined && numValue < min) {
            return `Value must be at least ${min}`;
          }
          if (max !== undefined && numValue > max) {
            return `Value must be at most ${max}`;
          }
          return true;
        }
      };
    }

    // Format-specific validations
    const formatValidations: Record<string, (value: string) => string | boolean> = {
      'PHONE_IN': (value) => {
        const digitCount = extractDigits(cleanValue(value)).length;
        return digitCount === 10 || 'Phone number must be 10 digits';
      },
      'PHONE_IN_WITH_CODE': (value) => {
        const digitCount = extractDigits(cleanValue(value)).length;
        return digitCount === 10 || 'Phone number must be 10 digits';
      },
      'AADHAAR': (value) => {
        const digitCount = extractDigits(cleanValue(value)).length;
        return digitCount === 12 || 'Aadhaar number must be 12 digits';
      },
      'CARD': (value) => {
        const digitCount = extractDigits(cleanValue(value)).length;
        return (digitCount >= 13 && digitCount <= 19) || 'Card number must be 13-19 digits';
      }
    };

    if (format && formatValidations[format]) {
      rules.validate = {
        ...rules.validate,
        formatSpecific: formatValidations[format]
      };
    }

    return { ...rules, ...customRules };
  }, [required, label, maxLength, min, max, format, extractDigits, cleanValue, allowDecimal, customRules]);

  // Styling - simplified and optimized
  const customStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.shape?.borderRadius || 8,
      pl: 0,
      pr: mask ? theme.spacing(1.5) : 0,
      fontSize: theme.typography.body2.fontSize,
      transition: theme.transitions?.create?.([
        'border-color',
        'background-color',
        'box-shadow',
      ], {
        duration: theme.transitions?.duration?.short || 200,
      }) || 'all 0.2s ease',
      '&:hover:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled)': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: alpha(theme.palette.primary.main, 0.8),
        },
      },
      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
          borderWidth: '2px',
        },
        backgroundColor: alpha(theme.palette.primary.main, 0.02),
      },
      '&.Mui-error': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.error.main,
        },
      },
      '&.Mui-disabled': {
        backgroundColor: alpha(theme.palette.text.disabled || '#000', 0.05),
      },
    },
    '& .MuiInputBase-input': {
      padding: size === 'small'
        ? theme.spacing(1.25, 1.5)
        : theme.spacing(1.5, 2),
      pr: !mask ? theme.spacing(1.5) : 0,
      pl: startAdornment ? 0 : theme.spacing(1.5),
      fontSize: theme.typography.body2.fontSize,
      fontFamily: formatPattern ? 'monospace' : 'inherit',
      letterSpacing: formatPattern ? '0.5px' : 'normal',
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
    <Box sx={{ mb: 1.5 }}>
      <Controller
        name={name}
        control={control}
        rules={getValidationRules()}
        render={({ field: { value, onChange, ...field }, fieldState: { error: fieldError } }) => {
          const currentValue = value || '';
          const formattedValue = formatValue(currentValue);
          const displayValue = showMask && !isFocused
            ? '•'.repeat(extractDigits(formattedValue).length)
            : formattedValue;
          const digitCount = extractDigits(currentValue).length;
          const expectedCount = getExpectedDigitCount();

          return (
            <>
              <TextField
                {...field}
                inputRef={inputRef}
                value={displayValue}
                onChange={(e) => handleInputChange(e.target.value, onChange, e)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                label={
                  required ? (
                    <span>
                      {label}
                      <span style={{ color: theme.palette.error.dark }}>&nbsp;*</span>
                    </span>
                  ) : label
                }
                placeholder={getPlaceholder()}
                variant={variant}
                size={size}
                fullWidth={fullWidth}
                disabled={disabled}
                error={!!fieldError || !!error}
                // required={required}
                sx={customStyles}
                autoComplete={autoComplete}
                inputProps={{
                  inputMode: inputMode,
                }}
                InputProps={{
                  readOnly: readOnly,
                  startAdornment: (
                    <>
                      {showCountryCode && (
                        <InputAdornment position="start">
                          {allowCountryCodeChange ? (
                            <FormControl size="small" variant="standard">
                              <Select
                                value={selectedCountryCode}
                                onChange={(e) => setSelectedCountryCode(e.target.value)}
                                disabled={disabled}
                                sx={{
                                  fontSize: 'inherit',
                                  '&:before, &:after': { display: 'none' },
                                  '& .MuiSelect-select': {
                                  }
                                }}
                              >
                                {Object.entries(COUNTRY_CODES).map(([key, country]) => (
                                  <MenuItem key={key} value={key}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                                      <span>{country.flag}</span>
                                      <Typography variant="body2">{country.code}</Typography>
                                    </Box>
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          ) : (
                            <Chip
                              size="small"
                              label={`${COUNTRY_CODES[selectedCountryCode].flag} ${COUNTRY_CODES[selectedCountryCode].code}`}
                              variant="outlined"
                              sx={{ height: 'auto', fontSize: 'inherit', ml: theme.spacing(1.5) }}
                            />
                          )}
                        </InputAdornment>
                      )}
                      {startAdornment && (
                        <InputAdornment position="start" sx={{ ml: theme.spacing(1.5) }}>
                          {startAdornment}
                        </InputAdornment>
                      )}
                    </>
                  ),
                  endAdornment: (
                    <>
                      {mask && (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowMask(!showMask)}
                            edge="end"
                            size="small"
                            disabled={disabled}
                          >
                            {showMask ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )}
                      {endAdornment && (
                        <InputAdornment position="end">
                          {endAdornment}
                        </InputAdornment>
                      )}
                    </>
                  ),
                }}
              />

              {(fieldError || error || helperText) && (
                <FormHelperText
                  error={!!fieldError || !!error}
                  sx={{
                    ml: 0,
                    mt: 0.5,
                    fontSize: theme.typography.caption.fontSize,
                    color: fieldError || error
                      ? theme.palette.error.main
                      : theme.palette.text.secondary,
                  }}
                >
                  {fieldError?.message || error?.message || helperText}
                </FormHelperText>
              )}
              {showCharacterCount && expectedCount && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: digitCount > expectedCount
                        ? theme.palette.error.main
                        : digitCount === expectedCount
                          ? theme.palette.success?.main || theme.palette.primary.main
                          : theme.palette.text.disabled
                    }}
                  >
                    {digitCount}/{expectedCount}
                  </Typography>
                </Box>
              )}
            </>
          );
        }}
      />
    </Box>
  );
};

export default NumberInput;