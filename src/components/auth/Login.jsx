import React, { useState } from 'react';
import { Box, Button, Container, FormGroup, TextField, Typography } from '@mui/material'

import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, provider } from '../../config/firebase';
import { setError, setIsLoading } from '../../store/loaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/userSlice';
import Error from '../states/Error';
import { doc, setDoc } from 'firebase/firestore';

const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(state => state.loaderSlice.error);

  const submitDataHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setIsLoading(true))
      await signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          dispatch(setUser({ uid: userCredential.user.uid, username: userCredential.user.displayName, email: userCredential.user.email, photoURL: userCredential.user.photoURL }))
        });
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  const signupWithGoogle = async () => {
    try {
      dispatch(setIsLoading(true));

      await signInWithPopup(auth, provider)
        .then(user => {
          dispatch(setUser({ uid: user.uid, username: user.displayName, email: user.email, photoURL: user.photoURL }));

          // create collections for the new user
          setDoc(doc(db, "usersProfile", user.uid), {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
          });
          setDoc(doc(db, "usersFriends", user.uid), { friendsList: [] });
        })
    } catch (err) {
      dispatch(setError(err.message))
    } finally {
      dispatch(setError(null))
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
              display: 'flex',
              justifyContent: 'space-between',
              "&>div, &>button": {
                mb: "10px"
              }
            }}
          >
            {error && (<Error message={error} />)}
            <TextField placeholder='your email' type='text' onChange={e => setEmail(e.target.value)} value={email} />
            <TextField placeholder='password' type='password' onChange={e => setPassword(e.target.value)} value={password} />
            <Button variant='outlined' type='submit'>
              login
            </Button>
            <Button variant='contained' color='error' onClick={signupWithGoogle}>
              Login With Google
            </Button>
          </FormGroup>
        </form>
      </Box>
    </Container>
  )
}

export default Login;