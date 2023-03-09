import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () =>
  axios.get(`${baseUrl}`).then((response) => response.data);

export const createAnecdote = (anecdote) =>
  axios.post(`${baseUrl}`, anecdote).then((response) => response.data);

export const updateAnecdote = (anecdote) =>
  axios
    .patch(`${baseUrl}/${anecdote.id}`, { votes: anecdote.votes })
    .then((response) => response.data);
