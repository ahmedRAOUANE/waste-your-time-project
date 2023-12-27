import React, { useState } from 'react';
import { Box, Button, Container, FormGroup, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitDataHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password);
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
            {/* {!userExists && serverData !== null && <Alert severity="error">user not found!</Alert>} */}
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