import { useEffect } from "react";
import { auth, db } from "./firebase";
import { setUser } from "./store/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setFriendList } from "./store/friendListSlice";
import { setIsLoading } from "./store/loaderSlice";
import { Route, Routes, useNavigate } from "react-router-dom";
import { setAllNotifications } from "./store/notificationSlice";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

// styles
import "./style/index.css";
import "./style/layout.css";
import "./style/button.css";

// components
import Loader from "./pages/Loader";
import NotFound from "./pages/NotFound";
import Window from "./components/window/Window";
import Home from "./pages/userLayout/Home";
import AuthPage from "./pages/landingLayout/auth/AuthPage";
import LandingPage from "./pages/landingLayout/landingPage/LandingPage";
import { setError } from "./store/errorSlice";

const App = () => {
  const user = useSelector((state) => state.userSlice.user);
  const isLoading = useSelector(state => state.loaderSlice.isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = () => {
      onAuthStateChanged(auth, async (user) => {
        try {
          if (user) {
            dispatch(setUser({
              displayName: user.displayName,
              uid: user.uid,
              photoURL: user.photoURL,
            }))
          } else {
            dispatch(setUser(null));
          }
        } catch (err) {
          dispatch(setError(err.message));
        } finally {
          dispatch(setIsLoading(false))
        }
      })
    }

    return () => unsub();
  }, [dispatch, navigate]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
      <Routes>
            {user ? (
              <Route path="/">
                <Route index element={<Home />} />
              </Route>
            ) : (
                <Route path="/">
                  <Route index element={<LandingPage />} />
                  <Route path="/join" element={<AuthPage />} />
                </Route>
            )}
            <Route path="*" element={<NotFound />} />
      </Routes>
      )}

      <Window />
    </>
  );
};

export default App;