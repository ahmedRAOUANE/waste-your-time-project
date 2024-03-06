import { Box } from '@mui/material';
import React from "react";

// components
import Header from '../components/header/Header'
import Landing from '../components/landing/Landing';

const GuestLayout = () => {

    return (
        <Box>
            <Header />
            <Landing />
        </Box>
    )
}

export default GuestLayout