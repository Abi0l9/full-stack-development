import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { filterChange } from "../reducers/filterReducer";
import AnecdoteList from "./AnecdoteList";

const Filter = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const result = dispatch(
    filterChange(
      anecdotes.filter((anec) => anec.content.toLowerCase().includes(input))
    )
  );

  return (
    <div>
      <br />

      <form>
        <label htmlFor="filter" style={{ display: "block" }}>
          Filter anecdotes
        </label>
        <input
          type="text"
          name="filter"
          id="filter"
          onChange={handleChange}
          value={input}
        />
      </form>
      <br />
      <div>
        <AnecdoteList anecdotes={result.filter} />
      </div>
    </div>
  );
};

export default Filter;
