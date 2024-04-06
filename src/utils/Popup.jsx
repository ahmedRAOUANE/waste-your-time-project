import React from 'react';
import { Modal, Paper } from '@mui/material';
import { setResult } from '../store/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen, setWindow } from '../store/modalSlice';

// components 
import Search from "./Search"
import DisplayNotifications from './DisplayNotifications';

const style = {
    top: "50%",
    left: "50%",
    width: "60%",
    height: "60%",
    margin: "auto",
    maxWidth: "80%",
    padding: "20px",
    bgColor: "white",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    overflow: "scroll",
}

const Popup = () => {
    const open = useSelector(state => state.modalSlice.isOpen);
    const window = useSelector(state => state.modalSlice.window);

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setIsOpen(false));
        dispatch(setWindow(""));
        dispatch(setResult(null));
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Paper sx={{ ...style }}>
                {window === "search" && (
                    <Search />
                )}
                {window === "notifications" && (
                    <DisplayNotifications />
                )}
            </Paper>
        </Modal>
    )
}

export default Popup