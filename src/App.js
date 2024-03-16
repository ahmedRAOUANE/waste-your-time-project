import { useEffect } from "react";
import { setUser } from "./store/userSlice";
import { auth, db } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setFriendList } from "./store/friendListSlice";
import { setError, setIsLoading } from "./store/loaderSlice";
import { Route, Routes, useNavigate } from "react-router-dom";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useUpdateFreinds } from "./components/helpers/useUpdateFreinds";

// layout
import UserLayout from "./layout/UserLayout";
import GuestLayout from "./layout/GuestLayout";

// pages
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import ChatRoom from "./pages/ChatRoom";
import Popup from "./components/helpers/Popup";
import Loading from "./components/states/Loading";
import NotFound from "./components/states/NotFound";
import useUpdateNotifications from "./components/helpers/useUpdateNots";

const App = () => {
  const user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateFreinds = useUpdateFreinds();
  const updateNots = useUpdateNotifications();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      dispatch(setIsLoading(true))
      try {

        if (user) {
          dispatch(setUser({ uid: user.uid, username: user.displayName, email: user.email, photoURL: user.photoURL }));

          const userDocRef = (coll) => doc(db, coll, user.uid);
          const userFriendsDoc = await getDoc(userDocRef("usersFriends"));

          // TODO: check handeling the else case
          // update freindList
          if (userFriendsDoc.exists()) {
            try {
              onSnapshot(userFriendsDoc, doc => {
                dispatch(setFriendList(doc.data().setFriendList));
              })
            } catch (err) {
              dispatch(setError(err.message))
            }
          } else {
            console.log("userFriendsDoc is not found!, propably it havent created yet...")
            await setDoc(userDocRef("usersFriends"), {
              friendsList: []
            })
          }

          updateFreinds(user);

          updateNots();

        } else {
          dispatch(setUser(null))
          navigate("/")
        }
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setIsLoading(false))
      }
    })

    return () => {
      unsub();
    };
  }, [dispatch, navigate, updateFreinds, updateNots])

  return (
    <>
      <Loading />
      <Routes>
        <Route path="*" element={<NotFound />} />
        {user ? (
          <Route path="/" element={<UserLayout />} >
            <Route index element={<Home />} />
            <Route path="/chat" element={<ChatRoom />} />
            <Route path="/rooms" element={<Rooms />} />
          </Route>
        ) : (
            <Route path="/" element={<GuestLayout />} />
        )}
      </Routes>
      <Popup />
    </>
  );
};

export default App;