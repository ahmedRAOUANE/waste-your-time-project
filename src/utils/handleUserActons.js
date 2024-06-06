import { useDispatch } from "react-redux"
import { setIsOpen, setWindow } from "../store/windowSlice";

// custom hook to handle window
export const useHandleWindow = () => {
    const dispatch = useDispatch();

    const handleWindow = (isOpen, window) => {
        dispatch(setIsOpen(isOpen))
        dispatch(setWindow(window));
    }

    return handleWindow;
}