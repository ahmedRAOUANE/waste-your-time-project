import React, { useEffect, useRef } from 'react';
import { Alert, Box, Button, Container, FormGroup, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';

import { getData, sendData, getUserData } from "../../store/LoginSlice";
// import Loading from '../../components/loading/Loading';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const authState = useSelector(state => state.login.authState);
  const userExists = useSelector(state => state.login.userExists);
  const serverData = useSelector(state => state.login.serverData);
  const isLoggedin = useSelector(state => state.login.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useRef();
  const number = useRef();
  const password = useRef();

  const submitDataHandler = (e) => {
    e.preventDefault();
    const data = {
      userName: name.current.value,
      number: number.current.value,
      password: password.current.value
    }

    dispatch(getUserData(data))

    if (authState === "login") {
      dispatch(getData());
    }
    else if (authState === "signup") {
      dispatch(sendData(data));
    }
  }

  useEffect(() => {
    if (isLoggedin) {
      navigate('/home');
    }
  }, [isLoggedin, navigate])

  return (
    <Container sx={{ mt: '80px' }}>
      <Typography gutterBottom variant='h4' textAlign={'center'}>{authState === "login" ? "login" : "create a new account"}</Typography>
      <Box>
        <form onSubmit={submitDataHandler}>
          <FormGroup
            sx={{
              maxWidth: '500px',
              margin: 'auto',
              height: '300px',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <TextField placeholder='your name' type='text' inputRef={name} />
            <TextField placeholder='your number' type='text' inputRef={number} />
            <TextField placeholder='password' type='text' inputRef={password} />
            {!userExists && serverData !== null && <Alert severity="error">user not found!</Alert>}
            <Button variant='outlined' type='submit'>
              {authState === "login" ? "login" : "create a new account"}
              <Link to={'/loading'}>
              </Link>
            </Button>
          </FormGroup>
        </form>
      </Box>
    </Container>
  )
}

export default LoginPage;