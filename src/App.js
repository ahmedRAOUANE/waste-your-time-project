
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

// layout
import GuestLayout from "./layout/GuestLayout";
import UserLayout from "./layout/UserLayout";

// pages
import Loading from "./components/states/Loading";
import NotFound from "./components/states/NotFound";
import ChatRoom from "./pages/ChatRoom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { setUser } from "./store/userSlice";
import { setError, setIsLoading } from "./store/loaderSlice";

const App = () => {
  const user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const userState = onAuthStateChanged(auth, (user) => {
      dispatch(setIsLoading(true))
      try {
        if (user) {
          dispatch(setUser({ username: user.displayName, email: user.email }))
        } else {
          dispatch(setUser(null))
          navigate("waste-your-time-project/")
        }
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setIsLoading(false))
      }
    })

    return () => userState();
  }, [dispatch, navigate])

  return (
    <>
      <Loading />
      <Routes>
        <Route path="*" element={<NotFound />} />
        {user ? (
          <Route path="/waste-your-time-project/" element={<UserLayout />} >
            <Route path="/waste-your-time-project/" element={<Home />} />
            <Route path="/waste-your-time-project/chat" element={<ChatRoom />} />
            <Route path="/waste-your-time-project/rooms" element={<Rooms />} />
          </Route>
        ) : (
            <Route path="/waste-your-time-project/" element={<GuestLayout />} />
        )}
      </Routes>
    </>
  );
};

export default App;
