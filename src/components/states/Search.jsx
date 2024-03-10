import React, { useState } from 'react'
import { Box, TextField, Button, ListItem, ListItemText, Avatar, ListItemIcon, ListItemButton, List, Paper } from '@mui/material';
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useDispatch, useSelector } from 'react-redux';
import { setResult } from '../../store/searchSlice';
import { setIsOpen } from '../../store/modalSlice';
import { setFriendList } from '../../store/friendListSlice';

const Search = () => {
    const result = useSelector(state => state.searchSlice.result);
    const user = useSelector(state => state.userSlice.user);
    const [term, setTerm] = useState("");

    const dispatch = useDispatch();

    const searchHandler = async (e) => {
        e.preventDefault();

        const q = query(collection(db, "usersProfile"), where("displayName", "==", term));
        const querySnapShot = await getDocs(q);

        try {
            if (querySnapShot.size > 0) {
                const results = [];
                querySnapShot.forEach(doc => {
                    results.push(doc.data());
                });
                dispatch(setResult(results));
            } else {
                dispatch(setResult(null));
            }
        } catch (err) {
            console.log("Error: ", err);
            dispatch(setResult(null));
        }
    }

    const addToFriendListHandler = async (selectedUser) => {
        console.log("added!");
        // add the selected user to users friendlist
        const userFriendsDocRef = doc(db, "usersFriends", user.uid);
        await updateDoc(userFriendsDocRef, { friendsList: arrayUnion(selectedUser) });
        dispatch(setIsOpen(false));
        // dispatch(setFriendList(selectedUser));
    }

    return (
        <Box>
            <Paper>
                <form style={{ flex: 1, gap: '10px', display: "flex" }} onSubmit={searchHandler}>
                    <TextField onChange={(e) => setTerm(e.target.value)} type="search" placeholder="search friend" sx={{ flex: 1 }} />
                    <Button variant='contained' type='submit'>search</Button>
                </form>
            </Paper>

            <List>
                {result ? (
                    result.map((friend, idx) => (
                        <ListItem key={idx} disablePadding>
                            <ListItemButton onClick={() => addToFriendListHandler(friend)}>
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
        </Box>
    )
}

export default Search