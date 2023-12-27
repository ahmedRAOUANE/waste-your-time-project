import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { loginUser, logoutUser } from "./store/LoginSlice";
import { auth } from "./config/firebase";

// pages
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import LandingPage from "./Pages/landingPage/LandingPage";
import HomePage from "./Pages/homePage/HomePage";

const App = () => {
  const userData = useSelector((state) => state.login.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          loginUser({
            uid: user.uid,
            username: user.displayName,
            email: user.email,
          })
        );
      } else {
        dispatch(logoutUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={userData ? <HomePage /> : <LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
