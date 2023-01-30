import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const loginUser = (username, password) => {
  const request = axios.post("/api/login", { username, password });
  // request.then((response) => fn(response.data));
  return request;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, loginUser };
