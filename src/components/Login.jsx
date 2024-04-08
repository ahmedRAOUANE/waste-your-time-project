import React, { useRef } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, provider } from '../config/firebase';
import { setError, setIsLoading } from '../store/loaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/userSlice';
import Error from './Error';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Login = () => {
  const dispatch = useDispatch()
  const error = useSelector(state => state.loaderSlice.error);

  const emailRef = useRef();
  const passwordRef = useRef();

  const submitDataHandler = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    try {
      dispatch(setIsLoading(true))
      await signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
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

          const userDocRef = doc(db, "usersProfile", user.uid)
          const userProfileDoc = getDoc(userDocRef);

          // create doc for the new user
          if (!userProfileDoc.exists()) {
            setDoc(userDocRef, {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            });
          }
        })
    } catch (err) {
      dispatch(setError(err.message))
    } finally {
      dispatch(setError(null))
      dispatch(setIsLoading(false));
    }
  }

  return (
    <div className="form-container">
      <h3 className='text-center'>Login</h3>
      <form className='box column' onSubmit={submitDataHandler}>
        {error && (<Error message={error} />)}
        <div><input ref={emailRef} type="email" /></div>
        <div><input ref={passwordRef} type="password" /></div>
        <button type="submit">Login</button>
        <button className='danger' onClick={signupWithGoogle}>Login with Google</button>
      </form>
    </div>
  )
}

export default Login;