import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setIsLoading } from '../../store/loaderSlice';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { setUser } from '../../store/userSlice';

import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';

// icons
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
    const user = useSelector(state => state.userSlice.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const actionHandler = (action) => {
        if (action === "Logout") {
            logoutHandler()
        } else {
            navigate(`/${action}`);
        }
    }

    const logoutHandler = () => {
        try {
            dispatch(setIsLoading(true));
            signOut(auth)
                .then(() => {
                    dispatch(setUser(null))
                });
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setIsLoading(false));
        }
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleClosePage = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="sticky" sx={{ top: 0, zIndex: 2000 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* small media */}
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        WYT
                    </Typography>

                    {user && (
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleClosePage}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {['home', 'chat', 'rooms'].map((page) => (
                                    <MenuItem key={page} onClick={handleClosePage}>
                                        <Button><Link to={`/waste-your-time-project/${page === "home" ? "" : page}`}>{page}</Link></Button>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    )}

                    {/* large media */}
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        WYT
                    </Typography>

                    {user && (
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "flex-end" }}>
                            {['home', 'chat', 'rooms'].map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleClosePage}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <Link to={`/waste-your-time-project/${page === "home" ? "" : page}`}>
                                        {page}
                                    </Link>
                                </Button>
                            ))}
                        </Box>
                    )}

                    {/* menu list */}
                    {user && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={user.image ? user.image : "A"} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Button onClick={() => actionHandler(setting)}>{setting}</Button>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;