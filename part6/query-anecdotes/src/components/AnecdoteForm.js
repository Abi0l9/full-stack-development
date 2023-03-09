import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../services/requests";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const newAnecdote = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      console.log(newAnecdote);
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
    },
  });

  const getId = () => (10000 * Math.random()).toFixed(0);

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    const data = { content: content, id: getId(), votes: 0 };

    newAnecdote.mutate(data);
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
