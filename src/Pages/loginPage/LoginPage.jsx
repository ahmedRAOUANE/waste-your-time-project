import React from 'react'
import { Box, Button, Container, FormGroup, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { Textarea } from '@mui/joy';
// import {}


const LoginPage = () => {
  return (
    <Container sx={{ mt: '80px' }}>
      <Typography gutterBottom variant='h4' textAlign={'center'}>login</Typography>
      <Box>
        <form>
          <FormGroup
            sx={{
              maxWidth: '500px',
              margin: 'auto',
              height: '250px',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <TextField placeholder='your name' />
            <TextField placeholder='your number' />
            <TextField placeholder='password' />
            <Button variant='outlined' type='submit'>
              log in
            </Button>
          </FormGroup>
        </form>
      </Box>
    </Container>
  )
}

export default LoginPage