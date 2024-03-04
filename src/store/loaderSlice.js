import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name: "loader",
    initialState: { isLoading: false, error: null },

    reducers: {
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        setError: (state, { payload }) => {
            state.error = payload;
        }
    }
})

export const { setIsLoading, setError } = loaderSlice.actions;

export default loaderSlice.reducer
