import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setError } from "../store/loaderSlice";

import { Box, Button, Container, Grid, Typography } from '@mui/material';

// components
import Login from '../components/Login';
import Signup from '../components/Signup';


const Landing = () => {
  const [currentPage, steCurrentPage] = useState("login");
  const dispatch = useDispatch()

  const changeFormHandler = () => {
    steCurrentPage(prev => prev === "login" ? "signup" : "login");
    dispatch(setError(null));
  }

  return (
    <Box mt={8}>
      <Container>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant='h5' mt={12}>welcome to:</Typography>
            <Typography variant='h3' textAlign={'center'} gutterBottom>wast your time</Typography>
            <Typography variant='h5' mt={6}>here where you can manage your time effectively!</Typography>
            <Box
              mt={7}
              sx={{
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
                '@media(max-width: 424px)': {
                  flexDirection: 'column',
                  padding: '10px'
                }
              }}
            >
              <Button sx={{ display: { xs: "none", md: "flex" } }} variant='fill' onClick={changeFormHandler}>
                {currentPage === "login" ? "create new account" : "login"}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {currentPage === "login" ? (<Login />) : (<Signup />)}
            <Button sx={{ display: { md: "none" }, margin: "auto" }} variant='fill' onClick={changeFormHandler}>
              {currentPage === "login" ? "create new account" : "login"}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Landing;