import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export const createContact = (newObject) => {
  axios.post(baseUrl, newObject);
};

export const getContacts = (fn) => {
  const request = axios.get(baseUrl);
  return request.then((response) => fn(response.data));
};

export const removeContact = (id, name) => {
  window.confirm(`Delete ${name} from phonebook?`) &&
    axios.delete(`${baseUrl}/${id}`);
};

export const updateContact = (id, newContact) =>
  axios.put(`${baseUrl}/${id}`, newContact);
