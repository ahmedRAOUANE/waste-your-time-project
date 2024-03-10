import { configureStore } from "@reduxjs/toolkit";
// reducers
import userSlice from "./userSlice";
import loaderSlice from "./loaderSlice";
import friendListSlice from "./friendListSlice";
import searchSlice from "./searchSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
  reducer: {
    userSlice,
    loaderSlice,
    friendListSlice,
    searchSlice,
    modalSlice,
  },
});

export default store;
