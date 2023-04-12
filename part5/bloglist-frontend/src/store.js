import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "./reducers/blog";
import notificationReducer from "./reducers/notification";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
  },
});

export default store;
