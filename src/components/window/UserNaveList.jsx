import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { setUser } from "../../store/userSlice";
import { setError } from "../../store/errorSlice";
import { useNavigate } from "react-router-dom";
import { useHandleWindow } from "../../utils/handleUserActons";


const UserNavList = () => {
    const user = useSelector(state => state.userSlice.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const closeWindow = useHandleWindow()

    const handleLogout = async () => {
        try {
            await signOut(auth)
                .then(
                    () => {
                        dispatch(setUser(null));
                        navigate("/");
                        closeWindow(false, "");
                    })
        } catch (err) {
            dispatch(setError(err.message));
        }
    }

    return (
        <ul>
            {user && <li className='btn primary'>{user.displayName}</li>}
            <li className='btn primary' onClick={handleLogout}>logout</li>
        </ul>
    )
}

export default UserNavList;