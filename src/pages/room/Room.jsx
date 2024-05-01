import { v4 } from 'uuid';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { db, storage } from '../../config/firebase';
import React, { useEffect, useRef, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';

// icons
import ArticleIcon from '@mui/icons-material/Article';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// style
import style from "../../style/room.module.css";

const Room = () => {
    const user = useSelector(state => state.userSlice.user);

    const { roomID } = useParams();

    const [roomContent, setRoomContent] = useState([])

    const bookRef = useRef();

    useEffect(() => {
        const unsub = async () => {

            // get data from rooms content collecion
            const roomsContentDocRef = doc(db, "roomsContent", user.uid);
            const roomsContentDoc = await getDoc(roomsContentDocRef);

            if (roomsContentDoc.exists()) {
                onSnapshot(roomsContentDocRef, (doc) => {
                    const roomsList = doc.data().rooms;
                    const room = roomsList.find(target => target.id === roomID)
                    setRoomContent(room.content);
                })
            }
        }

        return () => unsub();
    }, [user.uid, roomID]);

    const uploadBooks = async () => {
        const files = bookRef.current.files;
        const bookList = [];
        const updatedContent = [...roomContent];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const storageRef = ref(storage, `books/${user.uid}/${file.name}`);

            if (!file.type.startsWith('text/')
                && !file.type.startsWith('application/pdf')
            ) {
                alert("Please upload only text files.");
                return;
            }

            bookList.push(file)

            try {
                await uploadBytes(storageRef, bookList)

                const downloadURL = await getDownloadURL(storageRef);

                const book = {
                    title: file.name,
                    id: `${user.uid}_${v4()}_${file.name}`,
                    url: downloadURL,
                    isInLibrary: true,
                }

                updatedContent.push(book)
            } catch (err) {
                console.log("Error uploading books: ", err);
            }
        }

        updateRoomsContent(updatedContent);
    }

    const updateRoomsContent = async (newContent) => {
        try {
            const contentDocRef = doc(db, "roomsContent", user.uid);
            const contentDoc = await getDoc(contentDocRef);

            if (contentDoc.exists()) {
                const allRooms = contentDoc.data().rooms;

                const updatedRoomsContent = allRooms.map(room => {
                    if (room.id === roomID) {
                        return { ...room, content: newContent }
                    }
                    return room;
                })

                await updateDoc(contentDocRef, {
                    rooms: updatedRoomsContent
                });
            } else {
                console.log("contentDoc not exist");
            }

        } catch (err) {
            console.log("Error updating roomContent doc: ", err);
        }
    }

    return (
        <div className='box align-items-top container'>
            <div className={`${style.library} box transparent full-width`}>
                <h4 className='full-width m-0'>my library</h4>
                {roomContent && (
                    <div className="transparent full-width">
                        <div className="scroller box align-items-left full-height">
                            <div className={`${style.book} box transparent no-shadow disable-Guitters primary m-0 btn card`}>
                                <label htmlFor='file' className='column box btn'>
                                    <AddCircleOutlineIcon sx={{ fontSize: "40px" }} />
                                    <p>add books</p>
                                </label>
                                <input type="file" ref={bookRef} multiple onChange={uploadBooks} name="file" id="file" className="hidden" />
                            </div>
                            {roomContent.length !== 0 ? (
                                roomContent.map((book, idx) => (
                                    <div key={idx} className={`${style.book} column box transparent btn card m-0 disable-shadow`}>
                                        <ArticleIcon sx={{ fontSize: "40px" }} />
                                        <h4>{book.title}</h4>
                                    </div>
                                ))
                            )
                                : (
                                    <p className='box hide-in-small'>you have no books inLibrary!</p>
                                )
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Room;

// the ui never changes 