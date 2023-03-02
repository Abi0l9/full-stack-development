import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterChange(state, action) {
      const newState = action.payload;
      return newState;
    },
  },
});

export const { filterChange } = filterSlice.actions;

export default filterSlice.reducer;
