import React, { useState } from 'react';
import { db } from "../config/firebase";
import { setIsOpen } from '../store/modalSlice';
import { setError } from '../store/loaderSlice';
import { setResult } from '../store/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { collection, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

// icons
import { Search } from '@mui/icons-material';

// components
import ListButton from '../components/ListButton';

const SearchWindow = () => {
    const user = useSelector(state => state.userSlice.user);
    const results = useSelector(state => state.searchSlice.result);
    const [term, setTerm] = useState("");

    const dispatch = useDispatch();

    const searchHandler = async (e) => {
        e.preventDefault();

        const q = query(collection(db, "usersProfile"), where("displayName", "==", term));
        const querySnapShot = await getDocs(q);

        try {
            if (querySnapShot.size > 0) {
                const results = [];
                querySnapShot.forEach(doc => {
                    results.push(doc.data());
                });
                dispatch(setResult(results));
            } else {
                dispatch(setResult(null));
            }
        } catch (err) {
            dispatch(setResult(null));
            dispatch(setError(err.message));
        }
    }

    const handleFreindRequest = async (selectedUser) => {
        const request = {
            senderUID: user.uid,
            senderPhoto: selectedUser.photoURL || null,
            content: `${user.username} send's you a freind request`,
            status: "",
            seen: false,
            type: "freind_request"
        }

        // add freind request to selected user notifications
        const selectedUserDocRef = doc(db, "notifications", selectedUser.uid);
        const selectedUserDoc = await getDoc(selectedUserDocRef);

        if (selectedUserDoc.exists()) {
            await updateDoc(selectedUserDocRef, {
                notifications: arrayUnion(request)
            })
        }

        // remove the previous results and close window
        dispatch(setResult(null));
        dispatch(setIsOpen(false));
    }

    return (
        <>
            <form onSubmit={searchHandler} className="search-input transparent box disable-Guitters">
                <input onChange={(e) => setTerm(e.target.value)} autoFocus type="search" name="search" id="search" placeholder='Search..' />
                <button type='submit' className='icon box center-x center-y'><Search /></button>
            </form>

            {results ? (
                <ul>
                    {results.map((freind, idx) => (
                        <ListButton style={{ marginBottom: '10px' }} key={idx} ele={freind} onclick={() => handleFreindRequest(freind)} />
                    ))}
                </ul>
            ) : (
                <div className="search-msg box center-x center-y">
                    <h4 className='text-center'>search freinds..</h4>
                </div>
            )}
        </>
    )
}

export default SearchWindow;

