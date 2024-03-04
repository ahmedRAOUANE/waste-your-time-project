import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../config/firebase'
import { Box, Container, FormGroup, TextField, Typography, Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { setError, setIsLoading } from '../../store/loaderSlice';
import { setUser } from '../../store/userSlice';


const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const submitDataHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch(setIsLoading(true))

            // Create user
            await createUserWithEmailAndPassword(auth, email, password)
                .then(userCredentials => {
            // Update user profile
                    updateProfile(userCredentials.user, { displayName: username });
                    dispatch(setUser({ username: userCredentials.user.displayName, email: userCredentials.user.email }));
                })

        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setIsLoading(false));
        }
    }

    return (
        <Container sx={{ mt: '80px' }}>
            <Typography gutterBottom variant='h4' textAlign={'center'}>create new account</Typography>
            <Box>
                <form>
                    <FormGroup
                        sx={{
                            maxWidth: '500px',
                            margin: 'auto',
                            height: '300px',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                >
                        <TextField onChange={(e) => setUsername(e.target.value)} placeholder='your name' type='text' value={username} />
                        <TextField onChange={(e) => setEmail(e.target.value)} placeholder='your email' type='email' value={email} />
                        <TextField onChange={(e) => setPassword(e.target.value)} placeholder='password' type='password' value={password} />
                        <Button type='submit' variant='outlined' onClick={submitDataHandler}>
                            signup
                        </Button>
                    </FormGroup>
                </form>
            </Box>
        </Container>
    )
}

export default Signup