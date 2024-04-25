import React, { useState } from 'react'

const CreateRoom = () => {
    const [type, setType] = useState("write");

    return (
        <div className='full-width'>
            <h2 className="title">Create Room</h2>
            <form className='box column'>
                <input required type="text" placeholder='room name' />
                <input type="text" placeholder='description' />
                <div className="roomtype">
                    choose a type:
                    <select onChange={(e) => setType(e.target.value)} name="type" id="type">
                        <option value="write">write</option>
                        <option value="read">read</option>
                    </select>
                </div>

                {type === "read" && (
                    <div className="file-holder">
                        <label htmlFor="book" className='btn primary'>want to upload a book?</label>
                        <input type="file" name="book" id="book" className='hidden' />
                    </div>
                )}

                <button className='secondary full-width'>Create</button>
            </form>
        </div>
    )
}

export default CreateRoom