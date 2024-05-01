import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import React, { useRef, useState } from 'react';
import { db, storage } from '../config/firebase';
import { setIsOpen, setWindow } from '../store/modalSlice';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// icons
import ArticleIcon from '@mui/icons-material/Article';

const CreateRoom = () => {
    const user = useSelector(state => state.userSlice.user);

    const [books, setBooks] = useState([])
    const [type, setType] = useState("write");
    const nameRef = useRef();
    const descRef = useRef();
    const fileRef = useRef();

    const dispatch = useDispatch();

    const [booksURLs, setBooksURLs] = useState([]);

    const [contentId, setContentId] = useState(`${v4()}_${user.uid}`);

    const creatRoom = async (e) => {
        e.preventDefault();

        createContentDoc();

        const payload = {
            title: nameRef.current.value,
            desc: descRef.current.value,
            type,
            id: contentId,
        };

        try {
            const roomsDocRef = doc(db, "usersRooms", user.uid);
            const roomsDoc = await getDoc(roomsDocRef)

            if (roomsDoc.exists()) {
                const rooms = roomsDoc.data().rooms;

                // chec if thers a room with the same type
                const roomExisting = rooms.find(room => room.type === type);

                if (!roomExisting) {
                    await updateDoc(roomsDocRef, {
                        rooms: arrayUnion(payload)
                    }).then(
                        () => {
                            dispatch(setWindow("success-window"))
                        }, () => {
                        dispatch(setWindow("failed-window"))
                    }
                    )
                } else {
                    alert("you can not create more than one room in type")
                }
            }
        } catch (err) {
            console.log("Error creating a room: ", err);
        }
    }

    const addBooks = async () => {
        const files = fileRef.current.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            // console.log("file type: ", file.type);
            if (!file.type.startsWith('text/')
                && !file.type.startsWith('application/pdf')
                && !file.type.startsWith('application/docx')
            ) {
                alert("Please upload only text files.");
                return;
            }
            // upload the file to firebase and get the download url
            setBooks(prev => [...prev, file])

            const storageRef = ref(storage, `books/${user.uid}/${file.name}`);

            try {
                await uploadBytes(storageRef, books)
                    .then(() => {
                        getDownloadURL(storageRef).then(downloadURL => {
                            const book = {
                                title: file.name,
                                id: `${user.uid}_${v4()}_${file.name}`,
                                url: downloadURL,
                                isInLibrary: true,
                            }

                            setBooksURLs(prev => [...prev, book])
                        });
                    })
            } catch (err) {
                console.log("Error uploading books: ", err);
            }
        }

        setContentId(`${v4()}_${user.uid}`);
    }

    const createContentDoc = async () => {
        const contentDocRef = doc(db, "roomsContent", user.uid);
        const contentDoc = await getDoc(contentDocRef);

        const roomContent = {
            content: createContent(type),
            id: contentId,
            name: nameRef.current.value
        }

        if (!contentDoc.exists()) {
            await setDoc(contentDocRef, {
                rooms: [roomContent]
            })
        } else {
            await updateDoc(contentDocRef, {
                rooms: arrayUnion(roomContent)
            })
        }
    }

    const createContent = (type) => {
        let roomContent;

        if (type === "read") {
            roomContent = booksURLs;
        }

        return roomContent;
    }

    return (
        <div className='full-width'>
            <h2 className="title">Create Room</h2>
            <form className='box column' onSubmit={creatRoom}>
                <input ref={nameRef} required type="text" placeholder='room name' />
                <input ref={descRef} type="text" placeholder='description' />
                <div className="roomtype">
                    choose a type:
                    <select onChange={(e) => setType(e.target.value)} name="type" id="type">
                        <option value="write">write</option>
                        <option value="read">read</option>
                    </select>
                </div>

                {type === "read" && (
                    <div className="file-holder">
                        <div className="input-holder box">
                            <label htmlFor="book" className='btn primary'>want to upload a book?</label>
                            <input multiple ref={fileRef} type="file" name="book" id="book" className='hidden' onChange={addBooks} />
                        </div>
                        {books.length !== 0 && (
                            <div className="books full-width box">
                                {books.map((book, idx) => (
                                    <div key={idx} className="book box column">
                                        <ArticleIcon sx={{ fontSize: "80px" }} />
                                        <p className="title">{book.name}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <button type='submit' className='secondary full-width'>Create</button>
            </form>
        </div>
    )
}

export default CreateRoom