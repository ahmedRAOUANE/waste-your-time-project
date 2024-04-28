import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import ListButton from '../../components/ListButton'

const Room = () => {
    return (
        <div className='full-width box'>
            <ul className="nav-links transparent column box">
                {["home", "my library", "store"].map((page, idx) => (
                    <Link key={idx} to={`./${page === "home" ? "" : page}`} className='full-width'>
                        <ListButton noPhoto ele={{ displayName: page }} />
                    </Link>
                ))}
            </ul>
            <div className="content box column">
                <Outlet />
            </div>
        </div>
    )
}

export default Room