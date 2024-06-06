import { configureStore } from "@reduxjs/toolkit";

// reducers
import userSlice from "./userSlice";
import roomsSlice from "./roomsSlice";
import errorSlice from "./errorSlice";
import searchSlice from "./searchSlice";
import windowSlice from "./windowSlice";
import loaderSlice from "./loaderSlice";
import authFormSlice from "./authFormSlice";
import friendListSlice from "./friendListSlice";
import notificationSlice from "./notificationSlice";

const store = configureStore({
  reducer: {
    userSlice,
    roomsSlice,
    errorSlice,
    searchSlice,
    windowSlice,
    loaderSlice,
    authFormSlice,
    friendListSlice,
    notificationSlice,
  },
});

export default store;
