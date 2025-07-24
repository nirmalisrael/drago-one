import React from 'react';
import logo from '@/assets/images/final-logo.png'; // No curly braces
import { APP_LOGO_SIZE } from '@/constants/layout';

const LogoSection: React.FC = () => {
  return (
    <img
      src={logo}
      alt="Company Logo"
      style={{
        height: 'auto', // Automatically adjust height while maintaining aspect ratio
        width: '100%', // Cover the full width of the container
        maxHeight: `${APP_LOGO_SIZE}px`, // Limit the maximum height based on the provided size
        objectFit: 'fill', // Ensure the logo fits within its container without distortion
      }}
    />
  );
};

export default LogoSection;
