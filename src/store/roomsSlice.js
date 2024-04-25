import { createSlice } from "@reduxjs/toolkit";

const roomsSlice = createSlice({
    name: "rooms",
    initialState: {
        rooms: null
    },
    reducers: {
        setRooms: (state, { payload }) => {
            state.rooms = payload;
        }
    }
})

export const { setRooms } = roomsSlice.actions;
export default roomsSlice.reducer;