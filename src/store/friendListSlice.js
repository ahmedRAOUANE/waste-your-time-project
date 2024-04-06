import { createSlice } from "@reduxjs/toolkit";

const friendListSlice = createSlice({
    name: "friendList",
    initialState: { friendList: null },
    reducers: {
        setFriendList: (state, { payload }) => {
            state.friendList = payload;
        }
    }
})

export const { setFriendList } = friendListSlice.actions;
export default friendListSlice.reducer;



