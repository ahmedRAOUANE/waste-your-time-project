import React from 'react';
import { Modal, Paper } from '@mui/material';
import { setResult } from '../store/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen, setWindow } from '../store/modalSlice';

// components 
import SearchWindow from "./SearchWindow"
import DisplayNotifications from './DisplayNotifications';

import "../style/modal.css";
import UserMenu from './UserMenu';

const Popup = () => {
    const isOpen = useSelector(state => state.modalSlice.isOpen);
    const window = useSelector(state => state.modalSlice.window);

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setIsOpen(false));
        dispatch(setWindow(""));
        dispatch(setResult(null));
    }

    return isOpen && (
        <div className={`overlay box ${window}-container`} onClick={handleClose}>
            <div className={`${window} transparent`} onClick={(e) => e.stopPropagation()}>
                {window === "search" && (
                    <SearchWindow />
                )}
                {window === "notifications" && (
                    <DisplayNotifications />
                )}
                {window === "userMenu" && (
                    <UserMenu />
                )}
            </div>
        </div>
    )
}

export default Popup