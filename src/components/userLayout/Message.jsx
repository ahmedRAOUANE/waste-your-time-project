import React from 'react'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const messageStyle = {
    padding: "10px", borderRadius: "20px", color: "white", mb: "10px", width: "fit-content", maxWidth: "50%"
}

const Message = ({ message }) => {
    const currentUser = useSelector(state => state.userSlice.user);
    return (
        <>
            {message.owner === currentUser.uid ? (
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
                    <Typography sx={{ bgcolor: "blue", ...messageStyle }}>{message.msg}</Typography>
                </Box>
            ) : (
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                    <Typography sx={{ bgcolor: "grey", ...messageStyle }}>{message.msg}</Typography>
                </Box>
            )}
        </>
    )
}

export default Message