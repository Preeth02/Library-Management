import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booksData: {},
  currentBook: {},
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBooks: (state, action) => {
      state.booksData = action.payload;
      // console.log(action.payload);
    },
    deleteBooks: (state, action) => {
      state.booksData = [];
    },
    addCurrentBook: (state, action) => {
      state.currentBook = action.payload;
    },
  },
});

export const { addBooks, deleteBooks,addCurrentBook } = bookSlice.actions;
export default bookSlice.reducer;
