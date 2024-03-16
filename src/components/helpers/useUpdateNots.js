
import { db } from '../../config/firebase';
import { setError } from '../../store/loaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { setAllNotifications, setNewNotifications } from '../../store/notificationSlice';

const useUpdateNotifications = (user) => {
    // const user = useSelector(state => state.userSlice.user);

    const dispatch = useDispatch();

    const updateNotifications = async () => {
        // create notification based on user notifications collection updates
        try {
            console.log('user: ', user);
            const userDocRef = doc(db, "notifications", user.uid);
            const notificationDoc = await getDoc(userDocRef);
            if (!notificationDoc.exists()) {
                await setDoc(userDocRef("notifications"), {
                    notifications: []
                })
            } else {
                onSnapshot(userDocRef("notifications"), doc => {
                    const notificationList = doc.data().notifications;

                    if (notificationList) {
                        // dispatch to notifications
                        const seenNotifications = [];
                        const unseenNotifications = [];

                        notificationList.forEach((notification) => {

                            if (notification.seen) {
                                seenNotifications.push(notification);
                            } else {
                                unseenNotifications.push(notification);
                            }
                        });

                        dispatch(setAllNotifications(seenNotifications));
                        dispatch(setNewNotifications(unseenNotifications));
                    }
                })
            }
        } catch (err) {
            console.log('Error: ', err);

            dispatch(setError(err.message))
        }
    }

    return updateNotifications;
}

export default useUpdateNotifications;