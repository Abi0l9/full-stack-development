import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    type: "",
  },
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      state = { ...state, message: "", type: "" };
      return state;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const newNotification = (content, time = 4000) => {
  return (dispatch) => {
    dispatch(setNotification(content));

    setTimeout(() => {
      dispatch(clearNotification());
    }, time);
  };
};

export default notificationSlice.reducer;
