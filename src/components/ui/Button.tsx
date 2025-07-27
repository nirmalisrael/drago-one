import React from 'react';
import { Button as MUIButton, CircularProgress, type ButtonProps, Tooltip } from '@mui/material';

// Define custom props without exposing MUI props
interface CustomButtonProps {
  isLoading?: boolean;
  customStyle?: React.CSSProperties;
  name?: string;
  control?: React.Ref<any>;
  disabled?: boolean;
  variant?: "text" | "contained" | "outlined"; // You can expand this as needed
  text?: string;
  tooltip?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<CustomButtonProps> = ({
  isLoading,
  disabled,
  customStyle,
  name,
  control,
  variant = "contained",  // Default to "contained" if no variant is passed
  text,
  tooltip,
  onClick,
}) => {
  // The button's internal props mapping
  const buttonProps: ButtonProps = {
    disabled: disabled || isLoading,
    variant,
    onClick,
    name,
    ref: control,
  };

  // Return a Tooltip if a tooltip text is provided
  const buttonContent = isLoading ? (
    <>
      {'\u00A0'}
      <CircularProgress size={24} style={{ position: 'absolute' }} />
    </>
  ) : (
    text || "Submit" // Default button text if not provided
  );

  return tooltip ? (
    <Tooltip title={tooltip}>
      <MUIButton
        {...buttonProps}
        sx={{
          ...customStyle,
          position: 'relative',
          fontWeight: 600,
          cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
          textTransform: 'none', // Disable the uppercase transformation
        }}
      >
        {buttonContent}
      </MUIButton>
    </Tooltip>
  ) : (
    <MUIButton
      {...buttonProps}
      sx={{
        ...customStyle,
        fontWeight: 600,
        position: 'relative',
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        textTransform: 'none', // Disable the uppercase transformation
      }}
    >
      {buttonContent}
    </MUIButton>
  );
};

export default Button;
