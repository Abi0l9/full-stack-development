import axios from "axios";
const baseUrl = "/api/blogs";

let token;
const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const addBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.post(baseUrl, newBlog, config);

  return request.data;
};

const loginUser = (username, password) => {
  const request = axios.post("/api/login", { username, password });
  return request;
};

const updateLikes = (blogId, update) => {
  const request = axios.patch(`${baseUrl}/${blogId}`, update);
  return request;
};

const deleteBlog = (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${blogId}`, config);
  return request;
};

export default {
  getAll,
  loginUser,
  addBlog,
  setToken,
  deleteBlog,
  updateLikes,
};
