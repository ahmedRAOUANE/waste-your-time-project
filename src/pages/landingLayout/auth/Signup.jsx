import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthForm } from '../../../store/authFormSlice';
import { setError } from '../../../store/errorSlice';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase';
import { setIsLoading } from '../../../store/loaderSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const authForm = useSelector(state => state.authFormSlice.authForm);
    const error = useSelector(state => state.errorSlice.error);

    const dispatch = useDispatch();

    const emailRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            name: nameRef.current.value,
            password: passwordRef.current.value,
        }

        dispatch(setIsLoading(true))
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: payload.name });

            navigate("/")
        } catch (err) {
            console.log("Error logining in: ", err);
            dispatch(setError(err.message));
        }
        dispatch(setIsLoading(false))
    }

    const handleChangeAuthForm = () => {
        dispatch(setAuthForm(authForm === 0 ? 1 : 0))
    }

    const hideErrorMessage = () => {
        dispatch(setError(null))
    }

    return (
        <div className='box column transparent paper full-width'>
            <h2 className='disable-guitters'>Signup</h2>

            {error && (
                <div className="error-message paper outline box danger">
                    <p>somthing went wrong, try again</p>
                    <span onClick={hideErrorMessage} className='box center-x center-y outline transparent btn icon'>X</span>
                </div>
            )}

            <form onSubmit={handleSignup} className="box column full-width">
                <input className='outline' placeholder='email' ref={emailRef} type="email" name="email" id="email" />
                <input className='outline' placeholder='username' ref={nameRef} type="text" name="username" id="username" />
                <input className='outline' placeholder='password' ref={passwordRef} type="password" name="password" id="password" />
                <input className='outline primary' type="submit" name="submit" id="submit" value={"Signup"} />
            </form>

            {authForm === 0 ? (
                <p className='ai-center'>
                    don't have an account?, <button className='icon' onClick={handleChangeAuthForm}>Signup</button>
                </p>
            ) : (
                <p className='ai-center'>
                    already have an account?, <button className='icon' onClick={handleChangeAuthForm}>Login</button>
                </p>
            )}

            <div className="box full-width nowrap center-y">
                <hr className='full-width' />
                or
                <hr className='full-width' />
            </div>

            <button className='primary danger full-width'>Signup with Google</button>
        </div>
    )
}

export default Signup;