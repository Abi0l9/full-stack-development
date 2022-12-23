import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export const createNote = (newObject) => {
  axios.post(baseUrl, newObject);
};

export const getNotes = (fn) => {
  const request = axios.get(baseUrl);
  return request.then((response) => fn(response.data));
};
