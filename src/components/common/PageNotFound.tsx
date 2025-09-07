import React from 'react';
import { Box, Typography, Button, useTheme, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for React Router v6
import { motion } from 'framer-motion';

const PageNotFound: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <Box>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" color="primary" sx={{ marginBottom: theme.spacing(2) }}>
            404 - Page Not Found
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Typography variant="h6" color="textSecondary" sx={{ marginBottom: theme.spacing(4) }}>
            The page you are looking for doesn't exist.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleGoBack}
            sx={{ textTransform: 'none' }}
          >
            Go Back
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
};

export default PageNotFound;
