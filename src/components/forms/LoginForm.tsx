import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Paper,
  Typography,
  Container,
  useTheme,
  InputAdornment,
  IconButton,
  alpha
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { TextInput } from '@/components/ui/';
import CustomButton from '../ui/CustomButton';
import { useNavigate } from 'react-router-dom';

// Form data interface
interface LoginFormData {
  email: string;
  password: string;
  firstName: string;
  bio: string;
}

const LoginForm: React.FC = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      bio: ''
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('Form submitted:', data);
      // API call here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: theme.spacing(4),
          borderRadius: theme.spacing(2),
          background: theme.palette.background.paper
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightBold,
            mb: theme.spacing(3)
          }}
        >
          Login Form
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: '100%' }}
        >
          {/* Email Input */}
          <TextInput
            name="email"
            control={control}
            label="Email"
            placeholder="Enter your email"
            type="email"
            required
            startAdornment={
              <InputAdornment position="start">
                <EmailIcon sx={{ color: theme.palette.action.active }} />
              </InputAdornment>
            }
          />

          {/* Password Input */}
          <TextInput
            name="password"
            control={control}
            label="Password"
            placeholder="Enter your password"
            type={showPassword ? 'text' : 'password'}
            required
            startAdornment={
              <InputAdornment position="start">
                <LockIcon sx={{ color: theme.palette.action.active }} />
              </InputAdornment>
            }
          />

          {/* First Name Input */}
          <TextInput
            name="firstName"
            control={control}
            label="First Name"
            placeholder="Enter your first name"
            required
            maxLength={50}
            helperText="Enter your first name as it appears on your ID"
          />

          {/* Bio Text Area */}
          <TextInput
            name="bio"
            control={control}
            label="Bio"
            placeholder="Tell us about yourself..."
            multiline
            rows={4}
            maxLength={500}
            helperText="Optional: Write a short bio about yourself"
          />

          {/* Form Actions */}
          <Box
            sx={{
              display: 'flex',
              gap: theme.spacing(2),
              mt: theme.spacing(3)
            }}
          >
            <CustomButton
              type="primary"
              variant="contained"
              size="large"
              fullWidth
              disabled={isSubmitting}
              isLoading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </CustomButton>

            <CustomButton
              type="secondary"
              variant="outlined"
              size="large"
              onClick={handleReset}
              disabled={isSubmitting}
            >
              Reset
            </CustomButton>
          </Box>

          {/* Form Debug Info (Development only) */}
          {process.env.NODE_ENV === 'develodpment' && (
            <Box sx={{ mt: 3, p: 2, backgroundColor: theme.palette.grey[50], borderRadius: 1 }}>
              <Typography variant="caption" display="block" gutterBottom>
                Form Values (Debug):
              </Typography>
              <pre style={{ fontSize: '12px', margin: 0 }}>
                {JSON.stringify(watch(), null, 2)}
              </pre>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;