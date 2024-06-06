import React from 'react';

const initialStyle = {
    width: "40px"
}

const Sun = () => {
    return (
        <svg
            style={initialStyle}
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="WbSunnyIcon"
            tabndex="-1"
            title="WbSunny"
        >
            <path d="m6.76 4.84-1.8-1.79-1.41 1.41 1.79 1.79zM4 10.5H1v2h3zm9-9.95h-2V3.5h2zm7.45 3.91-1.41-1.41-1.79 1.79 1.41 1.41zm-3.21 13.7 1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5v2h3v-2zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6m-1 16.95h2V19.5h-2zm-7.45-3.91 1.41 1.41 1.79-1.8-1.41-1.41z"></path>
        </svg>
    )
}

const Moon = () => {
    return (
        <svg
            style={initialStyle}
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="Brightness3Icon"
            tabIndex="-1"
            title="Brightness3"
        >
            <path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2"></path>
        </svg>
    )
}

const Avatar = () => {
    return (
        <svg
            style={initialStyle}
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="AccountCircleIcon"
            tabIndex="-1"
            title="AccountCircle"
        >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20"></path>
        </svg>
    )
}

const Icon = ({ name }) => {
    switch (name) {
        case "sun":
            return (<Sun />)
        case "moon":
            return (<Moon />)
        case "avatar":
            return (<Avatar />)
        default:
            return null
    }
}

export default Icon