import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    userData: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    loginUser: (state, action) => {
      // console.log(action.payload);
      state.userData = action.payload;
    },
    logoutUser: (state) => {
      state.userData = null;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setIsLoading, setError } =
  loginSlice.actions;

export default loginSlice.reducer;
