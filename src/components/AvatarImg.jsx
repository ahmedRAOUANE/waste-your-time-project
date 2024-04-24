import React from 'react';
import { Avatar } from "@mui/material";

const AvatarImg = ({ photoURL, onclick, notiCount }) => {
    return (
        <div className='avatar-container btn' onClick={onclick}>
            {notiCount && (
                <div className="badge box center-x center-y">{notiCount}</div>
            )}
            <div className="avatar-image">
                <Avatar src={photoURL && photoURL} />
            </div>
        </div>
    )
}

export default AvatarImg