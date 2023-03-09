import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../services/requests";
import {
  clearNotitification,
  useNotificationDispatch,
} from "../notificationContext";

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch();

  const queryClient = useQueryClient();
  const newAnecdote = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));

      notificationDispatch({
        type: "CREATE",
        message: `anecdote ${newAnecdote.content} added`,
      });

      clearNotitification(notificationDispatch);
    },
    onError: ({ response }) => {
      notificationDispatch({
        type: "CREATE",
        message: response.data.error,
      });

      clearNotitification(notificationDispatch);
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
