import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAnecdotes, updateAnecdote } from "./services/requests";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");

      //update the data with the new result
      const allAnecs = anecdotes.map((anec) => {
        if (anec.id === updatedAnecdote.id) {
          return { ...anec, votes: updatedAnecdote.votes };
        }
        return anec;
      });

      queryClient.setQueryData("anecdotes", allAnecs);
    },
  });

  const handleVote = (anecdote) => {
    let votes = anecdote.votes + 1;
    let newObj = { id: anecdote.id, votes };
    updateMutation.mutate(newObj);
  };

  const result = useQuery("anecdotes", getAnecdotes, { retry: 1 });

  if (result.isLoading) {
    return <div>Anecdote service is not available due to server problems</div>;
  }

  const anecdotes = result.data.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
