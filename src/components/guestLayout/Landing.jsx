import { useDispatch } from 'react-redux';
import { auth } from "../../config/firebase";
import { setUser } from "../../store/userSlice";
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { setError, setIsLoading } from "../../store/loaderSlice";
import { Box, Button, Container, Grid, Typography } from '@mui/material';

// components
import Login from '../auth/Login';
import Signup from '../auth/Signup';


const Landing = () => {
  const [currentPage, steCurrentPage] = useState("login");
  const dispatch = useDispatch()

  const changeFormHandler = () => {
    steCurrentPage(prev => prev === "login" ? "signup" : "login");
    dispatch(setError(null));
  }

  // useEffect(() => {
  //   const userState = onAuthStateChanged(auth, (user) => {
  //     try {
  //       setIsLoading(true);
  //       if (user) {
  //         dispatch(setUser({ username: user.displayName, email: user.email }))
  //       } else {
  //         dispatch(setUser(null))
  //       }
  //     } catch (err) {
  //       dispatch(setError(err.message));
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   })

  //   // clean up when component unmount
  //   return () => userState();
  // }, [dispatch])

  return (
    <Box mt={8}>
      <Container>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant='h5' mt={12}>welcome to:</Typography>
            <Typography variant='h3' textAlign={'center'} gutterBottom>wast your time</Typography>
            <Typography variant='h5' mt={6}>here where you can use your time effectively!</Typography>
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