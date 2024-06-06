import React from 'react';
import { useSelector } from 'react-redux';
import { useHandleWindow } from '../../utils/handleUserActons';

import style from "../../style/window.module.css";
import UserNavList from './UserNaveList';

const Window = () => {
    const isOpen = useSelector(state => state.windowSlice.isOpen);
    const window = useSelector(state => state.windowSlice.window);

    const closeWindow = useHandleWindow();

    return isOpen && (
        <div onClick={() => closeWindow(false, "")} className={`${style.overlay} ${style[window + "Container"]} box center-x center-y`}>
            <div onClick={(e) => e.stopPropagation()} className={`${style[window]} paper`}>
                {window === "navList" && (
                    <UserNavList />
                )}
            </div>
        </div>
    )
}

export default Window