import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: '0',
        left: '0',
        bgcolor: '#fff',
        zIndex: 3
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;