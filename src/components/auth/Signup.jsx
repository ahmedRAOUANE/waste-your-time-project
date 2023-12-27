import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateCurrentUser } from "firebase/auth";
import { auth } from '../../config/firebase'
import { Box, Container, FormGroup, TextField, Typography, Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { loginUser, setError, setIsLoading } from '../../store/LoginSlice';


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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            console.log(userCredential);

            // Update user profile
            await updateCurrentUser(...userCredential.user, { displayName: username });

            // Sign in user
            await signInWithEmailAndPassword(auth, email, password);

            dispatch(setIsLoading(false));
            // dispatch(loginUser())
        } catch (error) {
            dispatch(setError(error.message));
            dispatch(setIsLoading(false))
        }
    }

    return (
        <Container sx={{ mt: '80px' }}>
            <Typography gutterBottom variant='h4' textAlign={'center'}>create new account</Typography>
            <Box>
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
                    <Button variant='outlined' onClick={submitDataHandler}>
                        signup
                    </Button>
                </FormGroup>
            </Box>
        </Container>
    )
}

export default Signup