import { createSlice } from "@reduxjs/toolkit";
import blogServices from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    getBlogs(state, action) {
      const blogs = action.payload;
      state.push(blogs);
    },
  },
});

export const { getBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll();
    dispatch(getBlogs(blogs));
  };
};

export default blogSlice.reducer;
