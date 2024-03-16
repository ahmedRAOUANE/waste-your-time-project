import React, { useState } from 'react';
import { db } from "../../config/firebase";
import { setIsOpen } from '../../store/modalSlice';
import { setError } from '../../store/loaderSlice';
import { setResult } from '../../store/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHandleFreindRequest } from './useUpdateFreinds';
import { collection, query, where, getDocs } from "firebase/firestore";
import { Box, TextField, Button, ListItem, ListItemText, Avatar, ListItemIcon, ListItemButton, List, Paper } from '@mui/material';

const Search = () => {
    const result = useSelector(state => state.searchSlice.result);
    const [term, setTerm] = useState("");
    const handleFreindRequest = useHandleFreindRequest();

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
            dispatch(setResult(null));
            dispatch(setError(err.message));
        }
    }

    const addToFriendListHandler = async (selectedUser) => {
        handleFreindRequest(selectedUser);

        // remove the previous results and close window
        dispatch(setResult(null));
        dispatch(setIsOpen(false));
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
                                <ListItemText primary={friend.email} />
                            </ListItemButton>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        search friends...
                    </ListItem>
                )}
            </List>
        </Box>
    )
}

export default Search;

