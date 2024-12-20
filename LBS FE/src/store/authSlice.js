import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  status: false,
  userData: {},
  userBooks: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
      state.userBooks = action.payload.books;
      // console.log(action.payload.books);
    },
    logout: (state, action) => {
      state.status = false;
      state.userData = {};
      state.userBooks = {};
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
