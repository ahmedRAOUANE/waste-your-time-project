import React, { useEffect, useRef } from 'react';
import { Box, Button, Container, FormGroup, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';

import { getData, sendData } from "../../store/LoginSlice";

const LoginPage = () => {
  const authState = useSelector(state => state.login.authState);
  const dispatch = useDispatch();

  const name = useRef();
  const number = useRef();
  const password = useRef();

  const submitDataHandler = (e) => {
    e.preventDefault();
    const data = {
      name: name.current.value,
      number: number.current.value,
      password: password.current.value
    }

    if (authState === "login") {
      dispatch(getData(data));
    }
    else if (authState === "signup") {
      dispatch(sendData(data));
    }
  }

  // useEffect to listen to state updates
  useEffect(() => {
    // This function will be called whenever the loginSlice state changes
    console.log("State in loginSlice has been updated:", authState);
    // You can perform additional actions based on the state update
  }, [authState]); // Include authState in the dependency array to run the effect when it changes

  return (
    <Container sx={{ mt: '80px' }}>
      <Typography gutterBottom variant='h4' textAlign={'center'}>{authState === "login" ? "login" : "create a new account"}</Typography>
      <Box>
        <form onSubmit={submitDataHandler}>
          <FormGroup
            sx={{
              maxWidth: '500px',
              margin: 'auto',
              height: '250px',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <TextField placeholder='your name' type='text' inputRef={name} />
            <TextField placeholder='your number' type='text' inputRef={number} />
            <TextField placeholder='password' type='text' inputRef={password} />
            <Button variant='outlined' type='submit'>
              log in
            </Button>
          </FormGroup>
        </form>
      </Box>
    </Container>
  )
}

export default LoginPage;