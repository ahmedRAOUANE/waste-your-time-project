import React, { useState } from 'react';
import { db } from '../config/firebase';
import { setError } from '../store/loaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen, setWindow } from '../store/modalSlice';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// components
import Message from '../components/Message';
import ListButton from '../components/ListButton';

// icons
import { Search } from '@mui/icons-material';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from "@mui/icons-material/Inbox";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// style
import "../style/chatRoom.css";

const ChatRoom = () => {
    const friendList = useSelector(state => state.friendListSlice.friendList);
    const currentUser = useSelector(state => state.userSlice.user);
    const [currentChat, setCurrentChat] = useState(null);
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const changeCurrentChatHandler = async (index, freind) => {
        setCurrentChat(index);
        setUser(freind);

        if (freind !== null) {
            const combinedID = (currentUser.uid > freind.uid ? currentUser.uid + freind.uid : freind.uid + currentUser.uid);

            try {
                const res = await getDoc(doc(db, "chats", combinedID));

                // create chat if not exists 
                if (!res.exists()) {
                    setDoc(doc(db, "chats", combinedID), { messages: [] })
                }
            } catch (err) { console.log("Error: ", err); }
        }
    }

    const handleOpenWindow = () => {
        dispatch(setIsOpen(true));
        dispatch(setWindow("search"));
    }

    const sendMessageHandler = async (e) => {
        e.preventDefault();

        if (message !== "") {
            const msgData = {
                msg: message,
                owner: currentUser.uid,
            }

            const combinedID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

            try {
                await updateDoc(doc(db, "chats", combinedID), { messages: arrayUnion(msgData) });
            } catch (err) {
                dispatch(setError(err.message));
                console.log("Error sending message: ", err);
            }

            setMessage("");
        }
    }

    return (
        <div className="box full-width">
            <aside className={`sidebar box transparent column nowrap ${currentChat ? "hide-in-small" : ''}`}>
                <div className='box transparent full-width disable-Guitters'>
                    <h3 className="title disable-Guitters icon">chats</h3>
                    <button className='icon' onClick={handleOpenWindow}><Search /></button>
                </div>
                <div className="chats">
                    <ul>
                        {friendList
                            ? friendList.map((freind, idx) => (
                                <ListButton style={{ marginBottom: '10px' }} key={idx} onclick={() => changeCurrentChatHandler(idx + 1, freind)} ele={freind} onlyName />
                            )) 
                            : (
                                <div>
                                    make some freinds first!
                                </div>
                            )
                        }
                    </ul>
                </div>
                <div className='more-options transparent full-width'>
                    <ul className="box">
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <li key={index} className="transparent box btn">
                                <div>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </div>
                                <p>{text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            <main className={`chat-container transparent box column nowrap ${currentChat ? "" : 'hide-in-small'}`}>
                {currentChat ? (
                    <>
                        <div className="title full-width">
                            <button onClick={() => changeCurrentChatHandler(null, null)} className="back-btn icon hide-in-large"><ArrowBackIosIcon /></button>
                            <ListButton onlyName ele={user} style={{ flex: '1' }} />
                        </div>
                        <div className="chat-body full-width nowrap">
                            <Message user={user} />
                        </div>
                        <form className='box full-width nowrap' onSubmit={sendMessageHandler}>
                            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder={"type something..."} sx={{ flex: 1 }} />
                            <button className='transparent' type='submit'>send</button>
                        </form>
                    </>
                ) : (
                        <div>select a chat to start messaging</div>
                )}
            </main>
        </div>
    )
}

export default ChatRoom;