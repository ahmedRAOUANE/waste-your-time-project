import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../store/LoginSlice';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { Box, Typography } from '@mui/material';

const HomePage = () => {
  const dispatch = useDispatch();

  const userData = useSelector(state => state.login.userData)

  const logoutHandler = () => {
    dispatch(logoutUser())
    signOut(auth);
  }

  return (
    <div>
      HomePage
      <Box>
        <Typography>username: {userData.username}</Typography>
        <Typography>mail: {userData.email}</Typography>
        <Typography>id: {userData.uid}</Typography>
      </Box>
      <button onClick={logoutHandler}>logout</button>
    </div>
  )
}

export default HomePage