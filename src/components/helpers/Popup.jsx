import { Modal, Paper } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsOpen, setWindow } from '../../store/modalSlice';

// components 
import Search from "../states/Search"

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    margin: "auto",
    padding: "20px",
    bgColor: "white",
    width: "60%",
    maxWidth: "80%",
    height: "60%"
}

const Popup = () => {
    const open = useSelector(state => state.modalSlice.isOpen);
    const window = useSelector(state => state.modalSlice.window);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setIsOpen(false));
        dispatch(setWindow(""));
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Paper sx={{ ...style }}>
                {window === "search" && (
                    <Search />
                )}
            </Paper>
        </Modal>
    )
}

export default Popup