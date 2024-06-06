import { useEffect } from "react";
import { setUser } from "./store/userSlice";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setFriendList } from "./store/friendListSlice";
import { setError, setIsLoading } from "./store/loaderSlice";
import { Route, Routes, useNavigate } from "react-router-dom";
import { setAllNotifications } from "./store/notificationSlice";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

// layout
import UserLayout from "./layout/UserLayout";
import AuthPage from "./pages/landingLayout/auth/AuthPage";
import LandingPage from "./pages/landingLayout/landingPage/LandingPage";

// styles
import "./style/index.css";
import "./style/layout.css";
import "./style/button.css";

const App = () => {
  const user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="/join" element={<AuthPage />} />
        </Route>
      </Routes>
    )
  }

  return (
    <>
      <UserLayout />
    </>
  );
};

export default App;