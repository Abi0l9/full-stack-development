import { createSlice } from "@reduxjs/toolkit";
import blogServices from "../services/blogs";
import { blogSorter } from "../utils";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    getBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      return action.payload;
    },
    incrementLikes(state, action) {
      return action.payload;
    },
    deleteBlog(state, action) {
      return action.payload;
    },
  },
});

export const { getBlogs, addBlog, incrementLikes, deleteBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll();
    dispatch(getBlogs(blogSorter(blogs)));
  };
};

export const createBlog = (newBlog, blogs) => {
  return async (dispatch) => {
    const request = await blogServices.addBlog(newBlog);

    const allBlogs = blogs.concat(newBlog);
    dispatch(getBlogs(blogSorter(allBlogs)));
    return request;
  };
};

export const updateLikes = (selectedBlog, blogs) => {
  return async (dispatch) => {
    let likes = selectedBlog.likes;
    likes++;
    const patchedBlog = { ...selectedBlog, likes: String(likes) };

    await blogServices.updateLikes(patchedBlog.id, { likes });

    const blogsToReturn = blogs.map((blog) =>
      blog.id === selectedBlog.id ? patchedBlog : blog
    );

    dispatch(incrementLikes(blogSorter(blogsToReturn)));
  };
};

export const removeBlog = (selectedBlog, blogs) => {
  return async (dispatch) => {
    await blogServices.deleteBlog(selectedBlog.id);

    const blogsToReturn = blogs.filter((blog) => blog.id !== selectedBlog.id);

    dispatch(deleteBlog(blogSorter(blogsToReturn)));
  };
};

export default blogSlice.reducer;
