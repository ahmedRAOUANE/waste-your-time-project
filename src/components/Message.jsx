import React, { useEffect, useState } from 'react';
import { div, p } from '@mui/material';
import { useSelector } from 'react-redux';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

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
        <div className="message full-width box column">
            {
                messageList
                    ? messageList.messages.map((message, idx) =>

                        message.owner === currentUser.uid
                            ? (
                                <div key={idx} className='box full-width column' style={{ alignItems: "flex-start" }}>
                                    <p style={{ backgroundColor: "#1976d2", ...messageStyle }}>{message.msg}</p>
                                </div>
                            )
                            : (
                                <div key={idx} className='box full-width column' style={{ alignItems: "flex-end" }}>
                                    <p style={{ backgroundColor: "grey", ...messageStyle }}>{message.msg}</p>
                                </div>
                            )

                    )
                    : (
                        <div>you have no messages yet!</div>
                    )
            }
        </div>
    )
}

export default Message