import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Container, IconButton, Toolbar, Typography } from '@mui/material';

// components
import NavList from './NavList';

// icons 
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    const user = useSelector(state => state.userSlice.user);
    const [toggleShow, setToggleShow] = useState(false);

    const toggleNavHandler = (() => {
        setToggleShow(!toggleShow);
    })

    return (
        <AppBar position="fixed">
            <Container>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Waste Your Time
                    </Typography>

                    {user && (
                        <IconButton
                            onClick={toggleNavHandler}
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{
                                "@media (min-width: 768px)": {
                                    display: "none",
                                }
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    {user && <NavList showState={toggleShow} />}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;