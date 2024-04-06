import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import { useSelector } from 'react-redux';

const Loading = () => {
  const isLoading = useSelector(state => state.loaderSlice.isLoading);

  return isLoading && (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        position: 'sticky',
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