import React from 'react';
import { useSelector } from 'react-redux';
import { Box, List, Typography } from '@mui/material';

// components
import ListButton from '../components/ListButton';

const DisplayNotifications = () => {
    const newNotifications = useSelector(state => state.notificationSlice.newNotifications);
    const allNotifications = useSelector(state => state.notificationSlice.allNotifications);

    const showMoreDetailesHandler = (UID) => {
        // TODO: will navigate to sender profile
    }

    return (
        <Box>
            <Typography variant='h3'>notifications</Typography>
            <Box>
                {allNotifications &&
                    <List>
                        {allNotifications.map((notification, idx) => (
                            <ListButton key={idx} onClick={showMoreDetailesHandler} ele={notification} />
                        ))}
                    </List>
                }
            </Box>
        </Box>
    )
}

export default DisplayNotifications;