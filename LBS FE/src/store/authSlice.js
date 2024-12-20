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
    borrowedBook: (state, action) => {
      state.userBooks = action.payload;
    },
    returnedBooks: (state, action) => {
      state.userBooks = state.userBooks.filter(
        (bookId) => bookId !== action.payload
      );
    },
  },
});

export const { login, logout, borrowedBook, returnedBooks } = authSlice.actions;
export default authSlice.reducer;
