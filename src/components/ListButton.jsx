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
            const senderProfileDocRef = doc(db, "usersProfile", ele.senderUID);
            const senderProfileDoc = await getDoc(senderProfileDocRef);

            if (senderProfileDoc.exists()) {
                const senderDocRef = doc(db, "userFriends", user.uid);
                const senderDoc = await getDoc(senderDocRef);

                if (senderDoc.exists()) {
                    console.log("profile doc data: ", senderProfileDoc.data())
                    await updateDoc(senderDocRef, {
                        userFriends: arrayUnion(senderProfileDoc.data())
                    })
                } else {
                    await setDoc(senderDoc, {
                        userFriends: arrayUnion(senderProfileDoc.data())
                    })
                }
            }

            // add receiver to sender freind list
            const receiverProfileDocRef = doc(db, "usersProfile", user.uid);
            const receiverProfileDoc = await getDoc(receiverProfileDocRef);

            if (receiverProfileDoc.exists()) {
                const senderDocRef = doc(db, "userFriends", ele.senderUID);
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
        } else if (status === "rejected") {
            // then delete the notification
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