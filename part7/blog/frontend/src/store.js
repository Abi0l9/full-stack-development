import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "./reducers/blog";
import notificationReducer from "./reducers/notification";
import userReducer from "./reducers/user";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
  },
});

export default store;
