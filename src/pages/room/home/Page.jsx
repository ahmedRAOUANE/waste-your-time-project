import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';

// icons
import ArticleIcon from '@mui/icons-material/Article';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db, storage } from '../../../config/firebase';
import { getDatabase } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { setIsOpen, setWindow } from '../../../store/modalSlice';

const Page = () => {
    const user = useSelector(state => state.userSlice.user);
    const { roomID } = useParams();
    const [content, setContent] = useState(null)

    const [books, setBooks] = useState([])
    const fileRef = useRef();

    const [booksURLs, setBooksURLs] = useState([]);

    useEffect(() => {
        const unsub = async () => {

            // get data from rooms content collecion
            const roomsContentDocRef = doc(db, "roomsContent", user.uid);
            const roomsContentDoc = await getDoc(roomsContentDocRef);

            if (roomsContentDoc.exists()) {
                onSnapshot(roomsContentDocRef, (doc) => {
                    const roomsList = doc.data().rooms;
                    const room = roomsList.find(target => target.id === roomID)
                    setContent(room.content);
                })
            }
        }

        return () => unsub();
    }, [user.uid, roomID]);

    // const addBooks = () => {
    //     setIsOpen(true);
    //     setWindow("query files")
    // }

    const uploadBooks = async () => {
        if (fileRef.current.files !== undefined) {
            const files = fileRef.current.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                // console.log("file type: ", file.type);
                if (!file.type.startsWith('text/')
                    && !file.type.startsWith('application/pdf')
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
        }
    }

    return (
        <div className='full-width column box'>
            <div className="library box transparent">
                {content && (
                    <>
                        {content.length !== 0 ? (
                            content.map((book, idx) => (
                                <div key={idx} className="book">
                                    <ArticleIcon />
                                    <h4>{book.name}</h4>
                                </div>
                            ))
                        )
                            : (
                                <div className="text transparent full-width box">
                                    <p>you have no books inLibrary!</p>
                                    <div className="box">
                                        <label htmlFor='file' className='btn primary'>add books</label>
                                        <input type="file" multiple onClick={uploadBooks} name="file" id="file" className="hidden" />
                                    </div>
                                </div>
                            )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Page;