import { useEffect } from "react";
import { setUser } from "./store/userSlice";
import { auth, db } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setFriendList } from "./store/friendListSlice";
import { setError, setIsLoading } from "./store/loaderSlice";
import { Route, Routes, useNavigate } from "react-router-dom";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

// layout
import UserLayout from "./layout/UserLayout";
import GuestLayout from "./layout/GuestLayout";

// pages
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Popup from "./utils/Popup";
import ChatRoom from "./pages/ChatRoom";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import { setAllNotifications } from "./store/notificationSlice";
import Profile from "./pages/Profile";

const App = () => {
  const user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      dispatch(setIsLoading(true))
      try {

        if (user) {
          dispatch(setUser({
            uid: user.uid,
            username: user.displayName,
            email: user.email,
            photoURL: user.photoURL
          }));

          // create a profile doc if not exists
          const userProfileDocRef = doc(db, "usersProfile", user.uid)
          const userProfileDoc = await getDoc(userProfileDocRef);

          if (!userProfileDoc.exists()) {
            setDoc(userProfileDocRef, {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL
            });
          }

          // get user freinds doc or create one if not exists
          generateDoc(user, "userFriends", setFriendList)

          // get notifications doc or create one if not exists
          generateDoc(user, "notifications", setAllNotifications)

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

    const generateDoc = async (user, collection, action) => {
      const userDocRef = doc(db, collection, user.uid);
      const userDoc = await getDoc(userDocRef)

      if (userDoc.exists()) {
        onSnapshot(userDocRef, (doc) => {
          dispatch(action(doc.data()[collection]))
        })
      } else {
        await setDoc(userDocRef, {
          [collection]: [],
        });
      }
    }

    return () => {
      unsub();
    };
  }, [dispatch, navigate])

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
            <Route path="/profile/:uid" element={<Profile />} />
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