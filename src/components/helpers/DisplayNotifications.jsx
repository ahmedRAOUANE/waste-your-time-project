import React from 'react';
import { useSelector } from 'react-redux';
import { useUpdateFreindRequest } from './useUpdateFreinds';
import { Box, Button, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from '@mui/material'

const DisplayNotifications = () => {
    const newNotifications = useSelector(state => state.notificationSlice.newNotifications);
    const allNotifications = useSelector(state => state.notificationSlice.allNotifications);
    const updateStateHandler = useUpdateFreindRequest();

    const showMoreDetailesHandler = (UID) => {
        // TODO: will navigate to sender profile
    }

    return (
        <Box>
            <Typography variant='h3'>notifications</Typography>
            <Paper>
                <Box>
                    {newNotifications &&
                        <List>
                            {newNotifications.map((notification, idx) => (
                                <ListItem key={idx} disablePadding>
                                    <ListItemButton onClick={showMoreDetailesHandler} sx={{ display: "flex", gap: '10px', flexWrap: "wrap" }}>
                                        <ListItemText primary={notification.content} />
                                        <Box sx={{ display: "flex", gap: '10px', flexWrap: "no-wrap" }}>
                                            <Button onClick={() => updateStateHandler(notification, "accepted")} variant='contained' color='primary'>Accept</Button>
                                            <Button onClick={() => updateStateHandler(notification, "rejected")} variant='contained' color='error'>Reject</Button>
                                        </Box>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    }

                    {allNotifications &&
                        <List>
                            {allNotifications.map((notification, idx) => (
                                <ListItem key={idx} disablePadding>
                                    <ListItemButton onClick={showMoreDetailesHandler} sx={{ display: "flex", gap: '10px', flexWrap: "wrap" }}>
                                        <ListItemText primary={notification.content} />
                                        <Box sx={{ display: "flex", gap: '10px', flexWrap: "no-wrap" }}>
                                            <Button onClick={() => updateStateHandler(notification, "accepted")} variant='contained' color='primary'>Accept</Button>
                                            <Button onClick={() => updateStateHandler(notification, "rejected")} variant='contained' color='error'>Reject</Button>
                                        </Box>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    }
                </Box>
            </Paper>
        </Box>
    )
}

export default DisplayNotifications