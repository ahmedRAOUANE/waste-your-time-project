import React from 'react';
import { Box } from '@mui/material';

// components
import Header from '../../components/header/Header'
import Landing from '../../components/landing/Landing';

const LandingPage = () => {
    return (
        <Box>
            <Header />
            <Landing />
        </Box>
    )
}

export default LandingPage