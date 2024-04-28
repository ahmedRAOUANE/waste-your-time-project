import React from 'react';
import AvatarImg from './AvatarImg';
import { db } from '../config/firebase';
import { useSelector } from 'react-redux';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import "../style/listButton.css";

const ListButton = ({ ele, onclick, key, onlyName, style, noPhoto }) => {
    const user = useSelector(state => state.userSlice.user);

    const handleFreindRequest = async (status) => {
        if (status === "accepted") {
            // add sender to receiver freind list 
            addToFreindlist(user.uid, ele.senderUID)

            // add receiver to sender freind list
            addToFreindlist(ele.senderUID, user.uid)

            // then delete the notification
            deleteNotification(ele)
        } else if (status === "rejected") {
            // then delete the notification
            deleteNotification(ele)
        }
    }

    const addToFreindlist = async (user1, user2) => {
        const receiverProfileDocRef = doc(db, "usersProfile", user1);
        const receiverProfileDoc = await getDoc(receiverProfileDocRef);

        if (receiverProfileDoc.exists()) {
            const senderDocRef = doc(db, "userFriends", user2);
            const senderDoc = await getDoc(senderDocRef);

            if (senderDoc.exists()) {
                console.log("profile doc data: ", receiverProfileDoc.data())
                await updateDoc(senderDocRef, {
                    userFriends: arrayUnion(receiverProfileDoc.data())
                })
            } else {
                await setDoc(senderDoc, {
                    userFriends: arrayUnion(receiverProfileDoc.data())
                })
            }
        }
    }

    const deleteNotification = async (ele) => {
        const notiDocRef = doc(db, "notifications", user.uid);
        const notiDoc = await getDoc(notiDocRef);

        if (notiDoc.exists()) {
            const notificationList = notiDoc.data().notifications;
            const target = notificationList.find(noti => noti.senderUID === ele.senderUID);

            const filteredNotifications = notificationList.filter(ele => ele.senderUID !== target.senderUID);

            await updateDoc(notiDocRef, {
                notifications: filteredNotifications
            });
        }
    }

    return (
        <li className='list-button btn transparent nowrap' onClick={onclick}>
            <div className="box user-info">
                {!noPhoto && <AvatarImg photoURL={ele.photoURL !== null ? ele.photoURL : ""} />}
                {ele.displayName && (
                    <h3 className="disable-Guitters">{ele.displayName}</h3>
                )}
            </div>
            {
                ele.content && (
                    <div>
                        <p>{ele.content}</p>
                        <div className='box'>
                            <button className='accept' onClick={() => handleFreindRequest("accepted")}>Accept</button>
                            <button className='reject' onClick={() => handleFreindRequest("rejected")}>Reject</button>
                        </div>
                    </div>
                )
            }
        </li>
    )
}

export default ListButton;
