import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      state = action.payload;

      return state;
    },
    clearNotification(state, action) {
      state = "";
      return state;
    },
  },
});

export const { clearNotification, setNotification } = notificationSlice.actions;

export const notification = (content, time) => {
  return (dispatch) => {
    dispatch(setNotification(content));

    setTimeout(() => {
      dispatch(clearNotification());
    }, time);
  };
};

export default notificationSlice.reducer;
