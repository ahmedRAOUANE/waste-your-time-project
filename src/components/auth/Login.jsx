import React, { useState } from 'react';
import { Box, Button, Container, FormGroup, TextField, Typography } from '@mui/material'

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { setError, setIsLoading } from '../../store/loaderSlice';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';

const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitDataHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setIsLoading(true))
      await signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          dispatch(setUser({ username: userCredential.user.displayName, email: userCredential.user.email }))
        });
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  return (
    <Container sx={{ mt: '80px' }}>
      <Typography gutterBottom variant='h4' textAlign={'center'}>login</Typography>
      <Box>
        <form onSubmit={submitDataHandler}>
          <FormGroup
            sx={{
              maxWidth: '500px',
              margin: 'auto',
              height: '200px',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <TextField placeholder='your email' type='text' onChange={e => setEmail(e.target.value)} value={email} />
            <TextField placeholder='password' type='password' onChange={e => setPassword(e.target.value)} value={password} />
            <Button variant='outlined' type='submit'>
              login
            </Button>
          </FormGroup>
        </form>
      </Box>
    </Container>
  )
}

export default Login;