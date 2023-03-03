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
      const id = action.payload;
      const newState = state.map((anec) => {
        if (anec.id === id) {
          let votes = anec.votes;
          votes++;

          return { ...anec, votes: votes };
        }

        return anec;
      });

      return newState.sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      const content = action.payload;
      state.push(content);
    },
    setAnecdotes(state, action) {
      return action.payload;
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
    dispatch(appendAnecdote(newAnecdote));
  };
};

export default anecdoteSlice.reducer;
