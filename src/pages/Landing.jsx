import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setError } from "../store/loaderSlice";

// styles

// components
import Login from '../components/Login';
import Signup from '../components/Signup';
import { storage } from '../config/firebase';
import { getDownloadURL, ref } from 'firebase/storage';


const Landing = () => {
  const [currentPage, steCurrentPage] = useState("login");
  const [bgI, setBgI] = useState('');
  const dispatch = useDispatch()

  const changeFormHandler = () => {
    steCurrentPage(prev => prev === "login" ? "signup" : "login");
    dispatch(setError(null));
  }

  useEffect(() => {
    const pathRef = ref(storage, "assets/LandingPageBackground.png");
    getDownloadURL(pathRef).then((res) => {
      setBgI(res);
    })
  }, [])

  return (
    <div className='landing box center-x center-y'>
      {/* background */}
      <img src={bgI} alt="" srcset="" className='cover-bg' />

      {/* content */}
      <div className="box cover-content container">
        <div className="box full-width">
          <div className="text-container box column">
            <div>
              <h2 className='title text-center text-md-start'>Waste Your Time</h2>
              <h3 className='text-center text-md-start'>here where you can manage your time effectively!</h3>
            </div>
          </div>
          <div className="transparent box column">
            {currentPage === "login" ? (
              <>
                <Login />
                <div className='box'>
                  Don't Have An Accout?,
                  <button className='icon' onClick={changeFormHandler}>
                    Create New Account
                  </button>
                </div>
              </>
            ) : (
              <>
                <Signup />
                <div>
                  Allready Have An Accout?,
                  <button className='icon' onClick={changeFormHandler}>
                    Login
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing;