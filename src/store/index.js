import { configureStore } from "@reduxjs/toolkit";
// reducers
import userSlice from "./userSlice";
import loaderSlice from "./loaderSlice";

const store = configureStore({
  reducer: {
    userSlice,
    loaderSlice,
  },
});

export default store;
