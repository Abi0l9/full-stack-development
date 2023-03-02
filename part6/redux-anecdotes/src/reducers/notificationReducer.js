import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    newVote(state, action) {
      const content = action.payload;
      state = content;
      return state;
    },
    clearNotification(state, action) {
      state = "";
      return state;
    },
  },
});

export const { newAnecdote, clearNotification, newVote } =
  notificationSlice.actions;

export default notificationSlice.reducer;
