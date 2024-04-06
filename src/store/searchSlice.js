import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: { result: null },
    reducers: {
        setResult: (state, { payload }) => {
            state.result = payload;
        }
    }
})

export const { setResult } = searchSlice.actions;
export default searchSlice.reducer
