import { createSlice } from "@reduxjs/toolkit";

const toggleNavList = createSlice({
  name: "toggleShow",
  initialState: { toggleShow: true },
  reducers: {
    toggle: (state) => {
      state.toggleShow = !state.toggleShow;
    },
  },
});

export const { toggle } = toggleNavList.actions;

export default toggleNavList.reducer;
