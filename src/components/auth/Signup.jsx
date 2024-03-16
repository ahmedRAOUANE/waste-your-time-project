import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, db, provider } from '../../config/firebase'
import { Box, Container, FormGroup, TextField, Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { setError, setIsLoading } from '../../store/loaderSlice';
import { setUser } from '../../store/userSlice';
import Error from '../states/Error';
import { doc, getDoc, setDoc } from "firebase/firestore"


const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const error = useSelector(state => state.loaderSlice.error);

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
                    createCollections(userCredentials);
                })

        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setIsLoading(false));
        }
    }

    const signupWithGoogle = async () => {
        try {
            dispatch(setIsLoading(true));

            await signInWithPopup(auth, provider)
                .then(userCredentials => {
                    createCollections(userCredentials);
                })
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setIsLoading(false));
        }
    }

    const createCollections = (userCredentials) => {
    // update the current user
        dispatch(setUser({ uid: userCredentials.user.uid, username: userCredentials.user.displayName, email: userCredentials.user.email, photoURL: userCredentials.user.photoURL }));

        const userDocRef = (coll) => doc(db, coll, userCredentials.user.uid)
        const userProfileDoc = getDoc(userDocRef("usersProfile"));
        const userFriendsDoc = getDoc(userDocRef("usersFriends"));
        const userNotificationsDoc = getDoc(userDocRef("notifications"));

        // create collections for the new user
        if (!userProfileDoc.exists()) {
            setDoc(userDocRef("usersProfile"), {
                uid: userCredentials.user.uid,
                displayName: userCredentials.user.displayName,
                email: userCredentials.user.email,
            });
        }
        if (!userFriendsDoc.exists()) {
            setDoc(getDoc(userDocRef("usersFriends")), { friendsList: [] });
        }
        if (!userNotificationsDoc.exists()) {
            setDoc(getDoc(userDocRef("notifications")), { notificationList: [] });
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
                        {error && (<Error message={error} />)}
                        <TextField onChange={(e) => setUsername(e.target.value)} placeholder='your name' type='text' value={username} />
                        <TextField onChange={(e) => setEmail(e.target.value)} placeholder='your email' type='email' value={email} />
                        <TextField onChange={(e) => setPassword(e.target.value)} placeholder='password' type='password' value={password} />
                        <Button type='submit' variant='outlined' onClick={submitDataHandler}>
                            signup
                        </Button>
                        <Button variant='contained' color='error' onClick={signupWithGoogle}>
                            Signup With Google
                        </Button>
                    </FormGroup>
                </form>
            </Box>
        </Container>
    )
}

export default Signup