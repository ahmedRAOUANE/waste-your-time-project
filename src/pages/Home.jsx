import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { setRooms } from "../store/roomsSlice";

// style
import "../style/home.css";
import { setIsOpen, setWindow } from '../store/modalSlice';

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
            <div className="rooms-container box column transparent">
                {rooms ? (
                    <div className="room trasparent box column"></div>
                ) : (
                    <div className="text transparent full-width box">
                        <p>you have no rooms for now!</p>
                        <button onClick={createRoom} className='primary'>create room</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home