// Enhanced format patterns with better organization
export const FORMAT_PATTERNS = {
  // Phone formats
  PHONE_IN: '##### #####', // Indian: 12345 67890
  PHONE_IN_WITH_CODE: '+91 ##### #####', // +91 12345 67890
  PHONE_US: '(###) ###-####', // US: (123) 456-7890
  PHONE_US_WITH_CODE: '+1 (###) ###-####', // +1 (123) 456-7890
  PHONE_BASIC: '##########', // Basic: 1234567890

  // Identity formats
  AADHAAR: '#### #### ####', // 1234 5678 9012
  SSN: '###-##-####', // 123-45-6789

  // Payment formats
  CARD: '#### #### #### ####', // 1234 5678 9012 3456
  CARD_AMEX: '#### ###### #####', // 1234 567890 12345
  CVV: '###', // 123

  // Common formats
  PIN: '######', // 123456
  OTP_4: '# # # #', // 1 2 3 4
  OTP_6: '# # # # # #', // 1 2 3 4 5 6
  ACCOUNT: '####-####-####', // 1234-5678-9012
  ROUTING: '#########', // 123456789
  EMPLOYEE_ID: 'EMP####', // 1234567
} as const;

// Country codes configuration
export const COUNTRY_CODES = {
  IN: { code: '+91', flag: '🇮🇳', name: 'India' },
  US: { code: '+1', flag: '🇺🇸', name: 'United States' },
  UK: { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  CA: { code: '+1', flag: '🇨🇦', name: 'Canada' },
  AU: { code: '+61', flag: '🇦🇺', name: 'Australia' },
} as const;
