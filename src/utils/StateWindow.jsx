import React from 'react'
import { setIsOpen, setWindow } from '../store/modalSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StateWindow = ({ state }) => {
    // const isOpen = useSelector(state => state.modalSlice.isOpen);
    // const window = useSelector(state => state.modalSlice.window);

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const handleClose = () => {
        dispatch(setIsOpen(false));
        dispatch(setWindow(""));
    }

    const visitRoom = () => {
        handleClose();
        navigate(`/waste-your-time-project/rooms/`) // navigate to the room page
    }

    return (
        <>
            {state === "success" && (
                <div className="success box transparent">
                    <p>room created seccessfully!</p>
                    <div className="actions box">
                        <button className='primary' onClick={handleClose}>ok</button>
                        <button className='accept' onClick={visitRoom}>visit Room</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default StateWindow