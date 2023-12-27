import React from 'react';
import { List, ListItem, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

const navbarLinks = ["login", "signup"]

const NavList = ({ showState }) => {
    const dispatch = useDispatch();

    return (
        <List
            sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "12px",
                fontWeight: "500",
                "& > li": { padding: 0, width: "auto", mx: "2px" },
                "& a": { textDecoration: "none" },
                "& div": { padding: "0 10px", borderRadius: "20px", display: "flex", alignItems: "center", height: "36px" },
                "@media (max-width: 767px)": {
                    display: showState ? "block" : 'none',
                    position: "absolute",
                    background: "white",
                    top: "120%",
                    right: "8%",
                    zIndex: "4",
                    boxShadow: "0 0 24px 4px #00000052",
                    padding: "10px",
                    borderRadius: "25px",
                    width: '80%',
                }
            }}
        >
            {
                navbarLinks.map(link => (
                    <ListItem key={link}>
                        <ListItemButton
                            sx={{
                                mb: 2,
                                backgroundColor: link === "login" ? "#00000056" : "",
                                "&:hover": { backgroundColor: link === "login" ? "#00000056" : "" },
                                "& a": { color: "#fff" },
                                "@media(max-width: 768px)": {
                                    "& a": { color: "#000" },
                                }
                            }}
                        >
                            <Link to={`/${link}`}>
                                <Typography sx={{
                                    "@media(max-width: 767px)": {
                                        color: 'black'
                                    }
                                }}>{link}</Typography>
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </List>
    )
}

export default NavList;