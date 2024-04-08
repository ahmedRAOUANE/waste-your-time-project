import Error from './Error';
import React, { useRef } from 'react';
import { setUser } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db, provider } from '../config/firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { setError, setIsLoading } from '../store/loaderSlice';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

const Signup = () => {
    const error = useSelector(state => state.loaderSlice.error);

    const emailRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()

    const dispatch = useDispatch();

    const submitDataHandler = async (e) => {
        e.preventDefault();

        const userCredentials = {
            email: emailRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }

        try {
            dispatch(setIsLoading(true))

            // Create user
            await createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
                .then(userCredentials => {
                    // Update user profile
                    updateProfile(userCredentials.user, { displayName: userCredentials.username });
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
                photoURL: userCredentials.user.photoURL
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
        <div className="form-container">
            <h3 className='text-center'>Signup</h3>
            <form className='box column' onSubmit={submitDataHandler}>
                {error && (<Error message={error} />)}
                <div><input ref={emailRef} type="email" /></div>
                <div><input ref={usernameRef} type="text" /></div>
                <div><input ref={passwordRef} type="password" /></div>
                <button type="submit">Signup</button>
                <button className='danger' onClick={signupWithGoogle}>Signup with Google</button>
            </form>
        </div>
    )
}

export default Signup;