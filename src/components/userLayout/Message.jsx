import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';

const messageStyle = {
    padding: "10px", borderRadius: "20px", color: "white", mb: "10px", width: "fit-content", maxWidth: "50%"
}

const Message = ({ user }) => {
    const currentUser = useSelector(state => state.userSlice.user);
    const [messageList, setMessageList] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            if (user) {
                const combinedID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

                try {
                    onSnapshot(doc(db, "chats", combinedID), (doc) => {
                        setMessageList(doc.data());
                    });
                } catch (err) {
                    console.log("Error: ", err);
                }
            }
        };

        fetchMessages();
    }, [user, currentUser.uid]);

    return (
        <>
            {
                messageList
                    ? messageList.messages.map((message, idx) =>
                        message.owner === currentUser.uid
                            ? (
                                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
                                    <Typography sx={{ bgcolor: "#1976d2", ...messageStyle }}>{message.msg}</Typography>
                                </Box>
                            )
                            : (
                                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                    <Typography sx={{ bgcolor: "grey", ...messageStyle }}>{message.msg}</Typography>
                                </Box>
                            )
                    )
                    : (
                        <div>you have no messages yet!</div>
                    )
            } 
        </>
    )
}

export default Message