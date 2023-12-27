import { configureStore } from "@reduxjs/toolkit";
// reducers
import login from "./LoginSlice";

const store = configureStore({
  reducer: {
    login,
  },
});

export default store;
