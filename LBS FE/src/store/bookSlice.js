import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booksData: [],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBooks: (state, action) => {
      state.booksData = action.payload;
    },
    deleteBooks: (state, action) => {
      state.booksData = [];
    },
  },
});

export const { addBooks, deleteBooks } = bookSlice.actions;
export default bookSlice.reducer;
