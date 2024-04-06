import { Box } from '@mui/material';
import React from "react";

// components
import Header from '../components/Header';
import Landing from '../pages/Landing';

const GuestLayout = () => {

    return (
        <Box>
            <Header />
            <Landing />
        </Box>
    )
}

export default GuestLayout