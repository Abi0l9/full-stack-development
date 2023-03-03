import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
// import { ThunkMiddleware } from "redux-thunk";

import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";

// const composedEnhancer = applyMiddleware(ThunkMiddleware);

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

export default store;
