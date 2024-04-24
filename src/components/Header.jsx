import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen, setWindow } from '../store/modalSlice';


// style
import "../style/header.css";
import { Search } from '@mui/icons-material';
import AvatarImg from './AvatarImg';

const navLinks = ["home", "chat", "rooms"];

function ResponsiveAppBar() {
    const user = useSelector(state => state.userSlice.user);
    // const newNotifications = useSelector(state => state.notificationSlice.newNotifications);

    const isOpen = useSelector(state => state.modalSlice.isOpen);

    const dispatch = useDispatch();

    const handleOpenWindow = (window) => {
        dispatch(setIsOpen(!isOpen))
        dispatch(setWindow(window))
    }

    return (
        <header className='transparent full-width'>
            <nav className='box'>
                <h1 className=''>WYT</h1>

                {/* search in large media */}
                <div onClick={() => handleOpenWindow("search")} className="search-input transparent box disable-Guitters hide-in-small">
                    <input placeholder='Search..' />
                    <button className='icon box center-x center-y'><Search /></button>
                </div>

                {/* navlist in large media */}
                <ul className='box hide-in-small'>
                    {navLinks.map((link, idx) => (
                        <li className={`btn icon`} key={idx}>
                            <Link to={`/${link === "home" ? "" : link}`}>{link}</Link>
                        </li>
                    ))}
                </ul>

                {/* search in small media */}
                <div className="box icon hide-in-large">
                    <button onClick={() => handleOpenWindow("search")} className='icon box center-x center-y'><Search /></button>
                </div>

                {/* Avatar */}
                <AvatarImg photoURL={user.photoURL} onclick={() => handleOpenWindow("userMenu")} />

                {/* navlist in small media */}
                <ul className='box hide-in-large full-width'>
                    {navLinks.map((link, idx) => (
                        <li className={`btn icon`} key={idx}>
                            <Link to={`/${link === "home" ? "" : link}`}>{link}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
export default ResponsiveAppBar;