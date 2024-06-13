import { createSlice } from "@reduxjs/toolkit";

const authFormSlice = createSlice({
    name: "authForm",
    initialState: {
        authForm: 0
    },
    reducers: {
        setAuthForm: (state, { payload }) => {
            state.authForm = payload;
        }
    }
})

export const { setAuthForm } = authFormSlice.actions;
export default authFormSlice.reducer;