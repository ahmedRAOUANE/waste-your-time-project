import React from 'react';
import { setResult } from '../store/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen, setWindow } from '../store/modalSlice';

// components 
import SearchWindow from "./SearchWindow"
import DisplayNotifications from './DisplayNotifications';

import "../style/modal.css";
import UserMenu from './UserMenu';
import CreateRoom from './CreateRoom';
import StateWindow from './StateWindow';
import { useNavigate } from 'react-router-dom';

const Popup = () => {
    const isOpen = useSelector(state => state.modalSlice.isOpen);
    const window = useSelector(state => state.modalSlice.window);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleClose = () => {
        dispatch(setIsOpen(false));
        dispatch(setWindow(""));
        dispatch(setResult(null));
    }

    const visitRoom = () => {
        handleClose();
        navigate(`/waste-your-time-project/rooms/`) // navigate to the room page
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
                {window === "create-room" && (
                    <CreateRoom />
                )}
                {window === "query success" && (
                    <div className="success box transparent">
                        <p>room created seccessfully!</p>
                        <div className="actions box">
                            <button className='primary' onClick={handleClose}>ok</button>
                            <button className='accept' onClick={visitRoom}>visit Room</button>
                        </div>
                    </div>
                )}
                {/* {window === "query files" && (
                    <div className="success box transparent">
                        <p>files uploaded</p>
                        <div className="actions box">
                            <button className='primary' onClick={handleClose}>ok</button>
                            <button className='accept' onClick={visitRoom}>visit Room</button>
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    )
}

export default Popup