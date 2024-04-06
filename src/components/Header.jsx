import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { setUser } from '../store/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen, setWindow } from '../store/modalSlice';
import { setError, setIsLoading } from '../store/loaderSlice';

import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Badge } from '@mui/material';

// icons
import MenuIcon from '@mui/icons-material/Menu';

function ResponsiveAppBar() {
    const user = useSelector(state => state.userSlice.user);
    const newNotifications = useSelector(state => state.notificationSlice.newNotifications);
    const settings = ['Profile', "notifications", 'Logout'];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(false);

    const handleAction = async (action) => {
        handleOpenUserMenu()
        if (action === "Logout") {
            handleLogout()
        } else if (action === "notifications") {
            dispatch(setIsOpen(true))
            dispatch(setWindow("notifications"))
        } else {
            navigate(`/${action}/${user.uid}`);
        }
    }

    const handleLogout = () => {
        try {
            dispatch(setIsLoading(true));
            dispatch(setError(null));
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

    const handleClosePage = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = () => {
        setAnchorElUser(!anchorElUser);
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
                                        <Button><Link to={`/${page === "home" ? "" : page}`}>{page}</Link></Button>
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
                                    <Link to={`/${page === "home" ? "" : page}`}>
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
                                    {newNotifications ? (
                                        <Badge badgeContent={newNotifications.length} color="secondary" >
                                            <Avatar alt="Remy Sharp" src={user.photoURL} />
                                        </Badge>
                                    ) : (
                                        <Avatar alt="Remy Sharp" src={user.photoURL} />
                                    )}
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
                                open={anchorElUser}
                                onClose={handleOpenUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleAction(setting)}>
                                        {setting === "Profile" ? user.username : setting}
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