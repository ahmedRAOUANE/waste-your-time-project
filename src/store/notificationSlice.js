import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: { allNotifications: null, newNotifications: null },
    reducers: {
        setAllNotifications: (state, { payload }) => {
            state.allNotifications = payload;
        },
        setNewNotifications: (state, { payload }) => {
            state.newNotifications = payload
        }
    }
})

export const { setAllNotifications, setNewNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
