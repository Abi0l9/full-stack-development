import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const getId = () => (100000 * Math.random()).toFixed(0);

  const addAnec = async (e) => {
    e.preventDefault();
    let input = e.target.anecdote.value;
    const data = {
      content: input,
      id: getId(),
      votes: 0,
    };

    dispatch(createAnecdote(data));

    e.target.anecdote.value = "";
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnec}>
        <div>
          <input name="anecdote" type="text" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
