import { configureStore } from "@reduxjs/toolkit";

// reducers
import userSlice from "./userSlice";
import roomsSlice from "./roomsSlice";
import modalSlice from "./modalSlice";
import searchSlice from "./searchSlice";
import loaderSlice from "./loaderSlice";
import friendListSlice from "./friendListSlice";
import notificationSlice from "./notificationSlice";

const store = configureStore({
  reducer: {
    userSlice,
    modalSlice,
    roomsSlice,
    searchSlice,
    loaderSlice,
    friendListSlice,
    notificationSlice,
  },
});

export default store;
