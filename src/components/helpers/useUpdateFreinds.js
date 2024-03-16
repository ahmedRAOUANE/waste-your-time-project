import { db } from "../../config/firebase";
import { setError } from '../../store/loaderSlice';
import { useDispatch, useSelector } from "react-redux";
import { setFriendList } from "../../store/friendListSlice";
import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';

export const useHandleFreindRequest = () => {
  const user = useSelector(state => state.userSlice.user);

  const dispatch = useDispatch();

  const handleFreindRequest = (selectedUser) => {
    createFreindRequest(selectedUser);
    readRequestState(selectedUser);
  }

  const createFreindRequest = async (selectedUser) => {
    try {
      const selectedUserDocRef = doc(db, "notifications", selectedUser.uid);
      const selectedUserDoc = await getDoc(selectedUserDocRef);

      const notificationData = {
        senderUID: user.uid,
        receiverUID: selectedUser.uid,
        type: "freind_request",
        seen: false,
        content: `${user.username} sends you a friend request`,
        state: "" // empty, succeed, rejected
      };

      if (!selectedUserDoc.exists()) {
        await setDoc(selectedUserDocRef, {
          notifications: [notificationData]
        });
      } else {
        await updateDoc(selectedUserDocRef, {
          notifications: arrayUnion(notificationData)
        });
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  // listen to updates in users's notifications doc
  const readRequestState = async (selectedUser) => {
    // get notifications from notifications collection
    try {
      const userFriendsDocRef = doc(db, "usersFriends", selectedUser.uid);
      const userFriendsDoc = await getDoc(userFriendsDocRef);
      console.log("selected user: ", selectedUser);

      const notificationDocRef = doc(db, "notifications", selectedUser.uid);
      const notificationDoc = await getDoc(notificationDocRef);

      if (notificationDoc.exists()) {
        const notificationList = notificationDoc.data().notifications;
        // console.log(notificationList);

        if (notificationList) {
          const friendRequest = notificationList.find(
            (notification) =>
              notification.receiverUID === selectedUser.uid &&
              notification.senderUID === user.uid &&
              notification.type === "freind_request"
          );

          // Check if friend request is accepted (state prop is set)
          if (friendRequest && friendRequest.state === "accepted") {
            // Update friend list based on state prop
            if (!userFriendsDoc.exists()) {
              setDoc(userFriendsDocRef, { friendsList: [selectedUser] });
            } else {
              updateDoc(userFriendsDocRef, { friendsList: arrayUnion(selectedUser) });
            }
          }
        }
      }
    } catch (err) {
      dispatch(setError(err.message))
    }
  }

  return handleFreindRequest;
}

export const useUpdateFreinds = () => {
  const user = useSelector(state => state.userSlice.user);
  const dispatch = useDispatch();

  // get notifications from notifications collection
  const updateFreinds = async () => {
    try {
      const userFriendsDocRef = doc(db, "usersFriends", user.uid);
      const userFriendsDoc = await getDoc(userFriendsDocRef);
      console.log("current user: ", user);

      const notificationDocRef = doc(db, "notifications", user.uid);
      const notificationDoc = await getDoc(notificationDocRef);

      if (notificationDoc.exists()) {
        const notificationList = notificationDoc.data().notifications;
        // console.log(notificationList);

        if (notificationList) {
          const friendRequest = notificationList.find(
            (notification) =>
              notification.receiverUID === user.uid &&
              notification.state === "accepted" &&
              notification.type === "freind_request"
          );

          // Check if friend request is accepted (state prop is set)
          if (friendRequest && friendRequest.state === "accepted") {
            // Update friend list based on state prop
            if (!userFriendsDoc.exists()) {
              setDoc(userFriendsDocRef, { friendsList: [user] });
            } else {
              updateDoc(userFriendsDocRef, { friendsList: arrayUnion(user) });
            }
          }
        }
      }
    } catch (err) {
      dispatch(setError(err.message))
    }
  }

  return updateFreinds;
}

export const useUpdateFreindRequest = () => {
  const user = useSelector(state => state.userSlice.user);

  const dispatch = useDispatch();

  // update state
  const updateStateHandler = async (currentNotificationList, newState) => {
    // const usersProfileDocRef = doc(db, "usersProfile", user.uid);
    // const usersProfileDoc = await getDoc(usersProfileDocRef);

    // const friendListDocRef = doc(db, "usersFriends", user.uid);
    // const friendListDoc = await getDoc(friendListDocRef);

    const notificationDocRef = doc(db, "notifications", user.uid);
    const notificationList = await getDoc(notificationDocRef);
    try {
      if (notificationList.data().notifications) {
        const updatedNotifications = notificationList.data().notifications.map((notification) => {
          if (currentNotificationList.receiverUID === notification.receiverUID) {
            return {
              ...notification,
              seen: true,
              state: newState,
            };
          }
          return notification;
        });

        updateDoc(notificationDocRef, {
          notifications: updatedNotifications,
        })
      }
    } catch (err) {
      dispatch(setError(err.message))
    }
  }


  return updateStateHandler;
}

const useGetFreinds = () => {
  const user = useSelector(state => state.userSlice.user);

  const dispatch = useDispatch();

  const getFreinds = async () => {
    const userDocRef = doc(db, "usersFriends", user.uid);
    const userFriendsDoc = await getDoc(userDocRef);
    if (userFriendsDoc.exists()) {
      try {
        onSnapshot(userFriendsDoc, doc => {
          // TODO: check freindList
          // console.log("", doc.data().setFriendList);
          dispatch(setFriendList(doc.data().friendList));
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
  }


  return getFreinds;
}

export default useGetFreinds;