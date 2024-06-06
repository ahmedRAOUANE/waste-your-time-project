
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import ThemeContext from '../context/ThemeContext';

// style
import "../style/header.css";
import Icon from '../assets/Icon';
import { useHandleWindow } from '../utils/handleUserActons';

const Header = () => {
    const user = useSelector(state => state.userSlice.user);

    const { theme, toggleTheme } = useContext(ThemeContext);

    const opneWindow = useHandleWindow();

    return (
        <header className='box transparent'>
            <h1 className='disable-guitters no-shadow'>WYT</h1>

            {user ? (
                <ul className='box hide-in-small'>
                    <li>
                        <button onClick={() => opneWindow(true, "navList")} className='icon'>
                            <Icon name="avatar" />
                        </button>
                    </li>
                    <li>
                        <button className='icon' onClick={toggleTheme}>
                            <Icon name={theme === "light" ? "moon" : "sun"} />
                        </button>
                    </li>
                </ul>
            ) : (
                <>
                    <button className='primary'>
                        <Link className='btn primary' to={"/join"}>
                            join us
                        </Link>
                    </button>
                </>
            )}
        </header>
    )
}

export default Header