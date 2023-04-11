import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "./reducers/blog";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
  },
});

export default store;
