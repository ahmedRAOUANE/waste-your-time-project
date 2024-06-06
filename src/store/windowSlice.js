import { createSlice } from "@reduxjs/toolkit";

const windowSlice = createSlice({
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

export const { setIsOpen, setWindow } = windowSlice.actions;

export default windowSlice.reducer
