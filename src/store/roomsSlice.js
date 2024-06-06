import { createSlice } from "@reduxjs/toolkit";

const roomsSlice = createSlice({
    name: "rooms",
    initialState: {
        rooms: [],
        content: []
    },
    reducers: {
        setRooms: (state, { payload }) => {
            state.rooms = payload;
        },
        setContent: (state, {payload}) => {
            state.content = payload;
        }
    }
})

export const { setRooms, setContent } = roomsSlice.actions;
export default roomsSlice.reducer;