
import { useSelector } from "react-redux";
import style from "../style/loader.module.css";


const Loader = () => {

    return (
        <div className={`${style.spinnerContainer} box full-width full-height center-x center-y`}>
            <div className={`${style.spinner}`}>
                <div className={`${style.doubleBounce1}`}></div>
                <div className={`${style.doubleBounce2}`}></div>
            </div>
        </div>
    );
};

export default Loader;
