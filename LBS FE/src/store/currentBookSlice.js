import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
  currentBookData: {},
};

const currentBookSlice = createSlice({
  name: "currentBook",
  initialState,
  reducers: {
    addCurrentBook: (state, action) => {
      state.currentBookData = action.payload;
    },
    deleteCurrentBook: (state, action) => {
      state.currentBookData = {};
    },
    updateBookData: (state, action) => {
      state.updateBookData = action.payload;
    },
  },
});

export const { addCurrentBook, deleteCurrentBook, updateBookData } =
  currentBookSlice.actions;
export default currentBookSlice.reducer;
