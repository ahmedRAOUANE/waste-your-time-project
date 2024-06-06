import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// style
import "../style/header.css";

const Header = () => {
    const user = useSelector(state => state.userSlice.user);

    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <header className='box transparent'>
            <h1 className='disable-guitters no-shadow'>WYT</h1>

            {user ? (
                <>
                    <button onClick={toggleTheme}>
                        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                    </button>
                </>
            ) : (
                <>
                    <button className='primary'>
                        <Link className='btn' to={"/join"}>
                            join us
                        </Link>
                    </button>
                </>
            )}
        </header>
    )
}

export default Header