import React from 'react';

import { ListItem, ListItemText, Avatar, ListItemIcon, ListItemButton, Paper, Box, Button } from '@mui/material'
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useSelector } from 'react-redux';

const ListButton = ({ ele, onclick, key, onlyName, style }) => {
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
        <Paper key={key} style={style}>
            <ListItem disablePadding>
                <ListItemButton onClick={onclick}>
                    <ListItemIcon>
                        <Avatar src={ele.photoURL !== null ? ele.photoURL : ""} alt="Remy Sharp" />
                    </ListItemIcon>
                    {ele && (
                        <>
                            {onlyName ? (
                                <ListItemText primary={ele.displayName} />
                            ) : (
                                <>
                                    <ListItemText primary={ele.displayName} />
                                    <ListItemText primary={ele.email} />
                                </>
                            )}
                        </>
                    )}
                    {
                        ele.content && (
                            <>
                                <ListItemText primary={ele.content} />
                                <Box sx={{ display: "flex", gap: '10px', flexWrap: "no-wrap" }}>
                                    <Button onClick={() => handleFreindRequest("accepted")} variant='contained' color='primary'>Accept</Button>
                                    <Button onClick={() => handleFreindRequest("rejected")} variant='contained' color='error'>Reject</Button>
                                </Box>
                            </>
                        )
                    }
                </ListItemButton>
            </ListItem>
        </Paper>
    )
}

export default ListButton