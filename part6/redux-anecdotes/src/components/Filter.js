import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { filterChange } from "../reducers/filterReducer";
import AnecdoteList from "./AnecdoteList";

const Filter = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  let handler = useRef(null);

  useEffect(() => {});

  handler.current = (e) => {
    setInput(e.target.value);
  };

  const result = dispatch(
    filterChange(
      anecdotes.filter((anec) => anec.content.toLowerCase().includes(input))
    )
  ).payload;

  return (
    <div>
      <br />

      <form onChange={handler.current}>
        <label htmlFor="filter" style={{ display: "block" }}>
          Filter anecdotes
        </label>
        <input type="text" name="filter" id="filter" />
      </form>
      <br />
      <div>
        <AnecdoteList anecdotes={result} />
      </div>
    </div>
  );
};

export default Filter;
