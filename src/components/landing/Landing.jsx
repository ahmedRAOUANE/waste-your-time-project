import { Box, Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Login from '../auth/Login';

const Landing = () => {

  const dispatch = useDispatch();

  const authStateHandler = (state) => {
    // dispatch(setAuthState(state))
  }

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
              <Button variant='fill' 
                sx={{
                  '@media(min-width: 768px)': {
                    display: 'none'
                  }
                }}
              >
                <Link to={'/login'}>login</Link>
              </Button>
              <Button variant='fill' >
                <Link to={'/signup'}>create new account</Link>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}
            sx={{
              '@media(max-width: 767px)': {
                display: 'none',
              },
            }}
          >
            <Login />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Landing;