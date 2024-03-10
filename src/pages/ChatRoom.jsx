import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen, setWindow } from '../store/modalSlice';
import { Avatar, Box, Button, Container, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Toolbar, Typography } from '@mui/material'

// components
import Message from '../components/userLayout/Message';

// icons
import { Search } from '@mui/icons-material';
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from '@mui/icons-material/Mail';
import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { setError } from '../store/loaderSlice';

const ChatRoom = () => {
    const friendList = useSelector(state => state.friendListSlice.friendList);
    const currentUser = useSelector(state => state.userSlice.user);
    const [currentChat, setCurrentChat] = useState(null);
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState(null);
    const dispatch = useDispatch();

    const changeCurrentChatHandler = async (index, freind) => {
        setCurrentChat(index);
        setUser(freind);

        const combinedID = currentUser.uid > freind.uid ? currentUser.uid + freind.uid : freind.uid + currentUser.uid;

        try {
            const res = await getDoc(doc(db, "chats", combinedID));

            // create chat if not exists 
            if (!res.exists()) {
                setDoc(doc(db, "chats", combinedID), { messages: [] })
            }
        } catch (err) { console.log("Error: ", err); }
    }

    // open search window
    const handleSearch = () => {
        dispatch(setIsOpen(true));
        dispatch(setWindow("search"));
    }

    const sendMessageHandler = async (e) => {
        e.preventDefault();

        const msgData = {
            msg: message,
            owner: currentUser.uid,
        }

        const combinedID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

        try {
            await updateDoc(doc(db, "chats", combinedID), { messages: arrayUnion(msgData) });

            // get msg data after update 
            const res = await getDoc(doc(db, "chats", combinedID));
            setMessageList(res.data());
        } catch (err) {
            dispatch(setError(err.message));
            console.log("Error sending message: ", err);
        }

        setMessage("");
    }

    useEffect(() => {
        const fetchMessages = async () => {
            if (currentChat && user) {
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
    }, [currentChat, user, currentUser.uid]);

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
                        <Typography textAlign={"center"} variant='h4'>Chat Rooms</Typography>
                        <IconButton onClick={handleSearch}>
                            <Search />
                        </IconButton>
                    </Box>
                    <List>
                        {friendList ? (
                            friendList.friendsList.map((friend, idx) => (
                                <ListItem key={idx} disablePadding>
                                    <ListItemButton onClick={() => changeCurrentChatHandler(idx + 1, friend)}>
                                        <ListItemIcon>
                                            <Avatar alt="Remy Sharp" />
                                        </ListItemIcon>
                                        <ListItemText primary={friend.displayName} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                make some friends first!
                            </ListItem>
                        )}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Container
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "calc(100vh - 68px)",
                }}
            >
                {currentChat ? (
                    <Grid container sx={{
                        justifyContent: "space-between",
                        height: "100%"
                    }}>
                        <Grid item xs={12} sx={{ display: 'flex', alignItems: "center", height: "50px" }}>
                            <IconButton sx={{ paddingLeft: 0 }}>
                                <Avatar alt="Remy Sharp" />
                            </IconButton>
                            <Typography variant='h4'>{user.displayName}</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ height: "70%", overflow: "scroll" }}>
                            {messageList ? messageList.messages.map(message => (
                                <Message message={message} />
                            )) : (
                                <div>you have no messages yet!</div>
                            )}
                        </Grid>
                        <Grid item xs={12} sx={{ display: "flex", gap: "10px", height: "55px" }}>
                            <form style={{ flex: 1, gap: '10px', display: "flex" }} onSubmit={sendMessageHandler}>
                                <TextField value={message} onChange={(e) => setMessage(e.target.value)} placeholder={"type something..."} sx={{ flex: 1 }} />
                                <Button variant='contained' type='submit'>send</Button>
                            </form>
                            <Button variant='contained' >img</Button>
                        </Grid>
                    </Grid>
                ) : (
                    <div>select a chat to start messaging</div>
                )}
            </Container>
        </Box>
    )
}

export default ChatRoom;