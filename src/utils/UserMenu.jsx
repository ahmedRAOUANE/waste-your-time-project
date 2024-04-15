import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { setUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen, setWindow } from '../store/modalSlice';
import { setError, setIsLoading } from '../store/loaderSlice';
import { setFriendList } from '../store/friendListSlice';
import { setAllNotifications } from '../store/notificationSlice';

const userMenuList = ['Profile', "notifications", 'Logout'];

const UserMenu = () => {
    const user = useSelector(state => state.userSlice.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAction = async (action) => {
        dispatch(setIsOpen(false))
        if (action === "Logout") {
            handleLogout()
        } else if (action === "notifications") {
            dispatch(setIsOpen(true))
            dispatch(setWindow("notifications"))
        } else {
            navigate(`/${action}/${user.uid}`);
        }
    }

    const handleLogout = () => {
        try {
            dispatch(setIsLoading(true));
            dispatch(setError(null));
            signOut(auth)
                .then(() => {
                    dispatch(setWindow(""))
                    dispatch(setFriendList(null))
                    dispatch(setAllNotifications(null))
                    dispatch(setUser(null))
                });
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setIsLoading(false));
        }
    }

    return (
        <ul>
            {
                userMenuList.map((setting, idx) => (
                    <li className='btn' key={idx} onClick={() => handleAction(setting)}>
                        {setting === "Profile" ? user.username : setting}
                    </li>
                ))
            }
        </ul>
    )
}

export default UserMenu