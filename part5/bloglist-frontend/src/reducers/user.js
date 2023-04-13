import { createSlice } from "@reduxjs/toolkit";
import blogServices from "../services/blogs";

const userReducer = createSlice({
  name: "user",
  initialState: "",
  reducers: {
    addUserData(state, action) {
      state = action.payload;
      return state;
    },
    clearUserData(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { addUserData, clearUserData } = userReducer.actions;

export const getUserData = (userData) => {
  return (dispatch) => {
    window.localStorage.setItem("user", JSON.stringify(userData));
    const parsedData = JSON.parse(localStorage.user);
    blogServices.setToken(parsedData.token);
    dispatch(addUserData(parsedData));
  };
};

export const removeUserData = () => {
  return (dispatch) => {
    window.localStorage.removeItem("user");
    dispatch(clearUserData(""));
  };
};

export default userReducer.reducer;
