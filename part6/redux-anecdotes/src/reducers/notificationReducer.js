import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    newAnecdote(state, action) {
      state = action.payload;
      return state;
    },
    clearNotification(state, action) {
      state = "";
      return state;
    },
  },
});

export const { newAnecdote, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
