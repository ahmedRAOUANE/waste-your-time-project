import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthForm } from '../../../store/authFormSlice';
import { setIsLoading } from '../../../store/loaderSlice';
import { setError } from '../../../store/errorSlice';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const authForm = useSelector(state => state.authFormSlice.authForm);
    const error = useSelector(state => state.errorSlice.error);

    const dispatch = useDispatch();

    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        dispatch(setIsLoading(true));
        try {
            await signInWithEmailAndPassword(auth, payload.email, payload.password)
                .then(() => {
                    navigate("/");
                })
        } catch (err) {
            console.log("Error loging in: ", err);
            dispatch(setError(err.message));
        } finally {
            dispatch(setIsLoading(false));
        }
    }

    const handleChangeAuthForm = () => {
        dispatch(setAuthForm(authForm === 0 ? 1 : 0));
    }

    const hideErrorMessage = () => {
        dispatch(setError(null))
    }

    return (
        <div className='box column transparent paper full-width'>
            <h2 className='disable-guitters'>Login</h2>

            {error && (
                <div className="error-message paper outline danger box">
                    <p>email or password is incorrect, try again..</p>
                    <span onClick={hideErrorMessage} className='box center-x center-y outline transparent btn icon'>X</span>
                </div>
            )}

            <form onSubmit={handleLogin} className="box column full-width">
                <input className='outline' placeholder='email' ref={emailRef} type="email" name="email" id="email" />
                <input className='outline' placeholder='password' ref={passwordRef} type="password" name="password" id="password" />
                <input className='primary outline' type="submit" name="submit" id="submit" value={"Login"} />
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

            <button className='primary danger full-width'>Login with Google</button>
        </div>
    )
}

export default Login;