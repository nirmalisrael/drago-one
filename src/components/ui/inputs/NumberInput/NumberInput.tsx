import React, { useState, useCallback, useMemo, useRef } from 'react';
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
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller, type Control, type FieldError } from 'react-hook-form';
import { COUNTRY_CODES, FORMAT_PATTERNS } from '@/constants/form-controls';

interface NumberInputProps {
  name: string;
  control: Control<any>;
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
  sx?: any;

  // Formatting options
  format?: keyof typeof FORMAT_PATTERNS | string;
  allowDecimal?: boolean;
  allowNegative?: boolean;
  decimalPlaces?: number;

  // Validation options
  min?: number;
  max?: number;
  maxLength?: number;
  customRules?: any;

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

const NumberInput: React.FC<NumberInputProps> = ({
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
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState<keyof typeof COUNTRY_CODES>(countryCode);
  const [showMask, setShowMask] = useState(mask);
  const inputRef = useRef<HTMLInputElement>(null);
  const [lastFormattedValue, setLastFormattedValue] = useState('');

  // Get format pattern
  const formatPattern = useMemo(() => {
    if (!format) return null;
    return FORMAT_PATTERNS[format as keyof typeof FORMAT_PATTERNS] || format;
  }, [format]);

  // Extract digits only from input
  const extractDigits = useCallback((value: string): string => {
    if (!value) return '';
    return value.replace(/\D/g, '');
  }, []);

  // Enhanced clean function with better decimal handling
  const cleanValue = useCallback((value: string): string => {
    if (!value) return '';

    let cleaned = value;

    // For formatted patterns, extract digits only first
    if (formatPattern) {
      cleaned = extractDigits(value);
    } else {
      // Handle negative numbers
      const isNegative = cleaned.startsWith('-');
      if (!allowNegative && isNegative) {
        cleaned = cleaned.slice(1);
      }

      // Handle decimals
      if (allowDecimal) {
        // Remove all non-digit characters except decimal point and minus
        cleaned = cleaned.replace(/[^\d.-]/g, '');

        // Ensure only one decimal point
        const parts = cleaned.split('.');
        if (parts.length > 2) {
          cleaned = parts[0] + '.' + parts.slice(1).join('');
        }

        // Limit decimal places
        if (parts[1] && parts[1].length > decimalPlaces) {
          cleaned = parts[0] + '.' + parts[1].slice(0, decimalPlaces);
        }
      } else {
        // Remove all non-digit characters except minus
        cleaned = cleaned.replace(/[^\d-]/g, '');
      }

      // Remove extra minus signs (keep only the first one if negative allowed)
      if (allowNegative && cleaned.includes('-')) {
        const minusIndex = cleaned.indexOf('-');
        if (minusIndex > 0) {
          cleaned = cleaned.replace(/-/g, '');
        } else {
          cleaned = '-' + cleaned.slice(1).replace(/-/g, '');
        }
      }
    }

    // Apply length constraint
    if (maxLength && cleaned.replace(/[^\d]/g, '').length > maxLength) {
      const digits = cleaned.replace(/[^\d]/g, '').slice(0, maxLength);
      if (allowDecimal && !formatPattern && cleaned.includes('.')) {
        const beforeDecimal = digits.slice(0, -decimalPlaces);
        const afterDecimal = digits.slice(-decimalPlaces);
        cleaned = beforeDecimal + (afterDecimal ? '.' + afterDecimal : '');
      } else {
        cleaned = digits;
      }
    }

    return cleaned;
  }, [formatPattern, extractDigits, allowDecimal, allowNegative, decimalPlaces, maxLength]);

  // Apply pattern to string - FIXED VERSION
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

  // Enhanced format function - COMPLETELY REWRITTEN
  const formatValue = useCallback((value: string): string => {
    if (!value) return '';

    const cleaned = cleanValue(value);

    if (!formatPattern) {
      return cleaned;
    }

    // For formatted patterns, work with digits only
    const digits = extractDigits(cleaned);

    if (!digits) return '';

    // Apply the pattern
    const formatted = applyPattern(digits, formatPattern);

    return formatted;
  }, [cleanValue, formatPattern, extractDigits, applyPattern]);

  // Calculate cursor position after formatting - NEW FUNCTION
  const calculateCursorPosition = useCallback((
    oldValue: string,
    newFormattedValue: string,
    oldCursorPos: number,
    isBackspace: boolean
  ): number => {
    if (!formatPattern) return oldCursorPos;

    if (isBackspace) {
      // For backspace, move cursor to previous digit position
      let newPos = oldCursorPos - 1;
      while (newPos >= 0 && formatPattern[newPos] !== '#') {
        newPos--;
      }
      return Math.max(0, newPos);
    }

    // For regular input, find the next digit position
    let digitsSeen = 0;
    let targetDigits = extractDigits(oldValue.substring(0, oldCursorPos)).length;

    for (let i = 0; i < newFormattedValue.length; i++) {
      if (formatPattern[i] === '#') {
        digitsSeen++;
        if (digitsSeen > targetDigits) {
          return i + 1;
        }
      }
    }

    return newFormattedValue.length;
  }, [formatPattern, extractDigits]);

  // Generate smart placeholder
  const getPlaceholder = useCallback((): string => {
    if (placeholder) return placeholder;

    if (formatPattern) {
      let exampleValue = formatPattern.replace(/#/g, '0');

      // Add country code for phone formats
      if (showCountryCode && format?.includes('PHONE')) {
        exampleValue = `${COUNTRY_CODES[selectedCountryCode].code} ${exampleValue}`;
      }

      return exampleValue;
    }

    if (format === 'PHONE_IN') return '98765 43210';
    if (format === 'AADHAAR') return '1234 5678 9012';
    if (format === 'CARD') return '1234 5678 9012 3456';

    return `Enter ${label?.toLowerCase() || 'number'}`;
  }, [placeholder, formatPattern, showCountryCode, format, selectedCountryCode, label]);

  // Enhanced validation rules
  const getValidationRules = useCallback(() => {
    const rules: any = {
      required: required ? `${label || 'This field'} is required` : false,
    };

    // Length validation
    if (maxLength) {
      rules.validate = {
        ...rules.validate,
        length: (value: string) => {
          const cleaned = cleanValue(value);
          const digitCount = cleaned.replace(/[^\d]/g, '').length;
          return digitCount <= maxLength || `Maximum ${maxLength} digits allowed`;
        }
      };
    }

    // Min/Max validation for numeric values
    if (min !== undefined || max !== undefined) {
      rules.validate = {
        ...rules.validate,
        range: (value: string) => {
          const cleaned = cleanValue(value);
          const numValue = allowDecimal ? parseFloat(cleaned) : parseInt(cleaned, 10);

          if (isNaN(numValue)) return true; // Let required handle empty values

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

    // Format-specific validation
    if (format === 'PHONE_IN' || format === 'PHONE_IN_WITH_CODE') {
      rules.validate = {
        ...rules.validate,
        phoneLength: (value: string) => {
          const cleaned = cleanValue(value);
          const digitCount = cleaned.replace(/[^\d]/g, '').length;
          return digitCount === 10 || 'Phone number must be 10 digits';
        }
      };
    }

    if (format === 'AADHAAR') {
      rules.validate = {
        ...rules.validate,
        aadhaarLength: (value: string) => {
          const cleaned = cleanValue(value);
          const digitCount = cleaned.replace(/[^\d]/g, '').length;
          return digitCount === 12 || 'Aadhaar number must be 12 digits';
        }
      };
    }

    if (format === 'CARD') {
      rules.validate = {
        ...rules.validate,
        cardLength: (value: string) => {
          const cleaned = cleanValue(value);
          const digitCount = cleaned.replace(/[^\d]/g, '').length;
          return (digitCount >= 13 && digitCount <= 19) || 'Card number must be 13-19 digits';
        }
      };
    }

    return { ...rules, ...customRules };
  }, [required, label, maxLength, min, max, format, cleanValue, allowDecimal, customRules]);

  // COMPLETELY REWRITTEN: Handle input change with proper cursor positioning
  const handleInputChange = useCallback((
    inputValue: string,
    onChange: (value: string) => void,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const currentCursorPos = event.target.selectionStart || 0;
    const oldValue = lastFormattedValue;
    const isBackspace = inputValue.length < oldValue.length;

    // Clean and format the value
    const cleaned = cleanValue(inputValue);
    const formatted = formatValue(cleaned);

    // Store the formatted value for next comparison
    setLastFormattedValue(formatted);

    // Call external change handler
    if (onValueChange) {
      onValueChange(cleaned, formatted, inputValue);
    }

    // Update form value with cleaned value for validation
    onChange(cleaned);

    // Handle cursor position after formatting
    setTimeout(() => {
      if (inputRef.current) {
        const newCursorPos = calculateCursorPosition(
          oldValue,
          formatted,
          currentCursorPos,
          isBackspace
        );
        inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  }, [cleanValue, formatValue, onValueChange, lastFormattedValue, calculateCursorPosition]);

  // Handle focus
  const handleFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus();
  }, [onFocus]);

  // Handle blur
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (onBlur) onBlur();
  }, [onBlur]);

  // Handle keydown for better backspace support - NEW FUNCTION
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!formatPattern) return;

    const target = event.target as HTMLInputElement;
    const cursorPos = target.selectionStart || 0;

    if (event.key === 'Backspace' && cursorPos > 0) {
      // If cursor is on a separator, move to the previous digit
      if (formatPattern[cursorPos - 1] !== '#') {
        event.preventDefault();
        let newPos = cursorPos - 1;
        while (newPos > 0 && formatPattern[newPos - 1] !== '#') {
          newPos--;
        }
        if (newPos > 0) {
          const newValue = target.value.slice(0, newPos - 1) + target.value.slice(cursorPos);
          target.value = newValue;
          target.setSelectionRange(newPos - 1, newPos - 1);

          // Trigger change event
          const changeEvent = new Event('input', { bubbles: true });
          target.dispatchEvent(changeEvent);
        }
      }
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      const direction = event.key === 'ArrowLeft' ? -1 : 1;
      let newPos = cursorPos + direction;

      // Skip over separators
      while (newPos >= 0 && newPos < formatPattern.length && formatPattern[newPos] !== '#') {
        newPos += direction;
      }

      if (newPos >= 0 && newPos <= target.value.length) {
        event.preventDefault();
        target.setSelectionRange(newPos, newPos);
      }
    }
  }, [formatPattern]);

  // Get expected digit count for progress display
  const getExpectedDigitCount = useCallback(() => {
    if (maxLength) return maxLength;
    if (formatPattern) {
      return formatPattern.replace(/[^#]/g, '').length;
    }
    return null;
  }, [maxLength, formatPattern]);

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
      fontFamily: formatPattern ? 'monospace' : theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightRegular || 400,
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
    <Box sx={{ mb: theme.spacing(1.5) }}>
      <Controller
        name={name}
        control={control}
        rules={getValidationRules()}
        render={({ field: { value, onChange, ...field }, fieldState: { error: fieldError } }) => {
          const currentValue = value || '';
          const formattedValue = formatValue(currentValue);
          const displayValue = showMask && !isFocused ? '•'.repeat(formattedValue.replace(/[^\d]/g, '').length) : formattedValue;
          const digitCount = cleanValue(currentValue).replace(/[^\d]/g, '').length;
          const expectedCount = getExpectedDigitCount();

          // Update last formatted value when value changes externally
          if (formattedValue !== lastFormattedValue) {
            setLastFormattedValue(formattedValue);
          }

          return (
            <>
              <TextField
                {...field}
                inputRef={inputRef}
                value={displayValue}
                onChange={(e) => handleInputChange(e.target.value, onChange, e)}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                label={label}
                placeholder={getPlaceholder()}
                variant={variant}
                size={size}
                fullWidth={fullWidth}
                disabled={disabled}
                error={!!fieldError || !!error}
                required={required}
                sx={customStyles}
                autoComplete={autoComplete}
                inputProps={{
                  inputMode: inputMode,
                  pattern: allowDecimal ? '[0-9]*\\.?[0-9]*' : '[0-9]*',
                }}
                InputProps={{
                  readOnly: readOnly,
                  startAdornment: (
                    <>
                      {/* Country Code Selector */}
                      {showCountryCode && (
                        <InputAdornment position="start">
                          {allowCountryCodeChange ? (
                            <FormControl size="small" variant="standard">
                              <Select
                                value={selectedCountryCode}
                                onChange={(e) => setSelectedCountryCode(e.target.value as keyof typeof COUNTRY_CODES)}
                                disabled={disabled}
                                sx={{
                                  fontSize: theme.typography.body2.fontSize,
                                  '&:before, &:after': { display: 'none' },
                                  '& .MuiSelect-select': {
                                    paddingRight: '20px !important',
                                    paddingBottom: 0,
                                    paddingTop: 0,
                                  }
                                }}
                              >
                                {Object.entries(COUNTRY_CODES).map(([key, country]) => (
                                  <MenuItem key={key} value={key}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
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
                              sx={{
                                height: 'auto',
                                fontSize: theme.typography.caption.fontSize,
                                '& .MuiChip-label': { px: 1 }
                              }}
                            />
                          )}
                        </InputAdornment>
                      )}
                      {startAdornment && (
                        <InputAdornment position="start">
                          {startAdornment}
                        </InputAdornment>
                      )}
                    </>
                  ),
                  endAdornment: (
                    <>
                      {/* Toggle Mask Button for sensitive data */}
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
                InputLabelProps={{
                  shrink: true,
                }}
              />

              {/* Character Count */}
              {showCharacterCount && expectedCount && (
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 0.5
                }}>
                  <Box />
                  <Typography
                    variant="caption"
                    sx={{
                      color: digitCount > expectedCount
                        ? theme.palette.error.main
                        : digitCount === expectedCount
                          ? theme.palette.success.main
                          : theme.palette.text.disabled
                    }}
                  >
                    {digitCount}/{expectedCount}
                  </Typography>
                </Box>
              )}

              {/* Helper Text / Error Message */}
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
            </>
          );
        }}
      />
    </Box>
  );
};

export default NumberInput;