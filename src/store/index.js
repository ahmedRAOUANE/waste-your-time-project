import { configureStore } from "@reduxjs/toolkit";
// reducers
import login from "./LoginSlice";
import toggleNav from "./toggleNavListSlice";

const store = configureStore({
  reducer: {
    login,
    toggleNav,
  },
});

export default store;
