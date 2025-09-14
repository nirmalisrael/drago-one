import React, { useState } from 'react';
import { Box, Typography, Container, Paper, Collapse, Grid, useTheme, Link } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import CustomButton from '../ui/button';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = () => window.location.reload();
  handleGoHome = () => (window.location.href = '/');

  render() {
    const { hasError, error, errorInfo } = this.state;

    if (hasError) {
      return (
        <ErrorDisplay
          error={error}
          errorInfo={errorInfo}
          onReload={this.handleReload}
          onGoHome={this.handleGoHome}
        />
      );
    }

    return this.props.children;
  }
}

interface ErrorDisplayProps {
  error?: Error;
  errorInfo?: React.ErrorInfo;
  onReload: () => void;
  onGoHome: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, errorInfo, onReload, onGoHome }) => {
  const [showDetails, setShowDetails] = useState(false);
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ mt: theme.spacing(4) }}>
      <Paper elevation={4} sx={{ p: theme.spacing(5), textAlign: 'center', borderRadius: theme.shape.borderRadius }}>
        <ErrorOutline color="error" sx={{ fontSize: 80 }} />
        <Typography variant="h3" gutterBottom sx={{ mt: theme.spacing(3) }}>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: theme.spacing(3) }}>
          An unexpected error occurred. Try refreshing the page or return to the homepage.
        </Typography>

        <Grid container justifyContent="center" spacing={2} sx={{ mb: theme.spacing(3) }}>
          <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
            <CustomButton type="primary" text="Refresh Page" onClick={onReload} fullWidth />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
            <CustomButton type="back" text="Go to Homepage" onClick={onGoHome} fullWidth />
          </Grid>
        </Grid>

        {error && (
          <Box sx={{ textAlign: 'left', margin: '0 auto' }}>
            <Typography variant="subtitle1" color="error" sx={{ wordBreak: 'break-word' }}>
              <strong>Error:</strong> {error.message}
            </Typography>

            {errorInfo?.componentStack && (
              <>
                <Link
                  component="button"
                  variant="body2"
                  underline="hover"
                  onClick={() => setShowDetails((prev) => !prev)}
                  sx={{ mt: theme.spacing(1), display: 'inline-block', cursor: 'pointer' }}
                >
                  {showDetails ? 'Show less' : 'Show more'}
                </Link>

                <Collapse in={showDetails}>
                  <Paper
                    elevation={1}
                    sx={{
                      mt: theme.spacing(2),
                      p: theme.spacing(2),
                      bgcolor: 'background.default',
                      fontFamily: 'monospace',
                      whiteSpace: 'pre-wrap',
                      overflowX: 'auto',
                      borderRadius: theme.shape.borderRadius,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {errorInfo.componentStack}
                    </Typography>
                  </Paper>
                </Collapse>
              </>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ErrorBoundary;
