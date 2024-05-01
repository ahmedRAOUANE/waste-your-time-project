import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { db } from '../../config/firebase';
import { setRooms } from "../../store/roomsSlice";
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen, setWindow } from '../../store/modalSlice';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';

// style
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// style
import "../../style/home.css";

const customCardStyle = {
    width: "120px", height: "160px", gap: "10px"
}

const Home = () => {
    const user = useSelector(state => state.userSlice.user);
    const rooms = useSelector(state => state.roomsSlice.rooms);
    const isOpen = useSelector(state => state.modalSlice.isOpen);

    const dispatch = useDispatch()

    useEffect(() => {
        const unsub = async () => {
            try {
                const roomsDocRef = doc(db, "usersRooms", user.uid);
                const roomsDoc = await getDoc(roomsDocRef);

                if (roomsDoc.exists()) {
                    onSnapshot(roomsDocRef, (doc) => {
                        dispatch(setRooms(doc.data().rooms))
                    })
                } else {
                    setDoc(roomsDocRef, {
                        rooms: []
                    })
                }

            } catch (err) {
                console.log("Errpr getting rooms: ", err);
            }
        }

        return () => unsub();
    }, [dispatch, user.uid]);

    const createRoom = () => {
        dispatch(setIsOpen(!isOpen))
        dispatch(setWindow("create-room"))
    }

    return (
        <div className='home box container'>
            <div className="info-container box column transparent">
                <div className="avatar box center-x center-y">
                    {user.photoURL ? (
                        <img src={user.photoURL} alt="user img" />
                    ) : (
                        <PersonIcon sx={{ fontSize: 200, fill: "white" }} />
                    )}
                </div>
                <div className="user-info">
                    <h2 className="title">{user.username}</h2>
                </div>
            </div>
            <div className="rooms-container box column transparent disable-shadow align-items-top">
                <div className="box transparent full-width disable-shadow align-items-left m-0">
                    <div style={customCardStyle} className="text transparent box column card disable-shadow">
                        <AddCircleOutlineIcon sx={{ fontSize: "40px" }} />
                        <button onClick={createRoom} className='primary icon'>create room</button>
                    </div>
                    {rooms.length > 0 ? (
                        <>
                            {rooms.map((room, idx) => (
                                <Link style={customCardStyle} to={`/rooms/${room.id}`} key={idx} className="box column transparent disable-shadow card m-0">
                                    <h3 className="title">{room.title}</h3>
                                    <div className="desc">{room.desc}</div>
                                </Link>
                            ))
                            }
                        </>
                    ) : (
                            <p>you have no rooms for now!</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home