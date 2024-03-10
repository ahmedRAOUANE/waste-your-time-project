import { useEffect } from "react";
import { auth, db } from "./config/firebase";
import { setUser } from "./store/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { setError, setIsLoading } from "./store/loaderSlice";

// layout
import GuestLayout from "./layout/GuestLayout";
import UserLayout from "./layout/UserLayout";

// pages
import Loading from "./components/states/Loading";
import NotFound from "./components/states/NotFound";
import ChatRoom from "./pages/ChatRoom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Popup from "./components/helpers/Popup";
import { doc, getDoc } from "firebase/firestore";
import { setFriendList } from "./store/friendListSlice";

const App = () => {

  const user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      dispatch(setIsLoading(true))
      try {
        if (user) {
          dispatch(setUser({ uid: user.uid, username: user.displayName, email: user.email }));

          // get users friendliset
          const userFriendsDocRef = await doc(db, "usersFriends", user.uid);
          const userDoc = await getDoc(userFriendsDocRef);

          dispatch(setFriendList(userDoc.data()));
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

    return () => unsub();
  }, [dispatch, navigate])

  return (
    <>
      <Loading />
      <Routes>
        <Route path="*" element={<NotFound />} />
        {user ? (
          <Route path="/waste-your-time-project/" element={<UserLayout />} >
            <Route index element={<Home />} />
            <Route path="/waste-your-time-project/chat" element={<ChatRoom />} />
            <Route path="/waste-your-time-project/rooms" element={<Rooms />} />
          </Route>
        ) : (
            <Route path="/waste-your-time-project/" element={<GuestLayout />} />
        )}
      </Routes>
      <Popup />
    </>
  );
};

export default App;
