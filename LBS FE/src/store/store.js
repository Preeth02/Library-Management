import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import bookSlice from "./bookSlice.js";
import currentBookSlice from "./currentBookSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    books: bookSlice,
    currentBook: currentBookSlice,
  },
});
