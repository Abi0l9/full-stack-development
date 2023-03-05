import { createSlice } from "@reduxjs/toolkit";
import anecdoteServices from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      const content = action.payload;
      state.push(content);
    },
    incrementVotes(state, action) {
      const payload = action.payload;

      return payload.sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      const content = action.payload;
      state.push(content);
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes);
    },
  },
});

export const { addAnecdote, incrementVotes, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteServices.createNew(content);
    dispatch(incrementVotes(newAnecdote));
  };
};

export const voteIncrement = (id, content) => {
  return async (dispatch) => {
    await anecdoteServices.updateVotes(id, content);

    const state = await anecdoteServices.getAll();
    dispatch(incrementVotes(state));
  };
};

export default anecdoteSlice.reducer;
