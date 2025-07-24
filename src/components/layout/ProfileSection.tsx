// /src/components/Layout/ProfileSection.tsx
import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

const ProfileSection: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Avatar alt="Profile" src="/profile.jpg" />
      <Typography variant="body1">Username</Typography>
    </Box>
  );
};

export default ProfileSection;
