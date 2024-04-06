import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: { isOpen: false, window: "" },
    reducers: {
        setIsOpen: (state, { payload }) => {
            state.isOpen = payload;
        },
        setWindow: (state, { payload }) => {
            state.window = payload;
        }
    }
})

export const { setIsOpen, setWindow } = modalSlice.actions;

export default modalSlice.reducer
