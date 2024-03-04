import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { Box, Typography } from '@mui/material';
import { setUser } from '../../store/userSlice';
import { setError, setIsLoading } from '../../store/loaderSlice';

const HomePage = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.userSlice.user)

  const logoutHandler = () => {
    try {
      dispatch(setIsLoading(true));
      signOut(auth)
        .then(() => {
          dispatch(setUser(null))
        });
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  return (
    <div>
      HomePage
      <Box>
        <Typography>username: {user.username}</Typography>
        <Typography>mail: {user.email}</Typography>
        <Typography>id: {user.uid}</Typography>
      </Box>
      <button onClick={logoutHandler}>logout</button>
    </div>
  )
}

export default HomePage