import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { newAnecdote } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnec = (e) => {
    e.preventDefault();
    let input = e.target.anecdote.value;
    dispatch(addAnecdote(input));
    dispatch(newAnecdote(input));
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
