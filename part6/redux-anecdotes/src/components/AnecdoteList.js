import { useDispatch } from "react-redux";
import { voteIncrement } from "../reducers/anecdoteReducer";
import { notification } from "../reducers/notificationReducer";

const AnecdoteList = ({ anecdotes }) => {
  const dispatch = useDispatch();

  const vote = (id, votes) => {
    dispatch(voteIncrement(id, votes));
  };

  const handleVoteNotification = (id, content, votes) => {
    let votesCount = Number(votes);
    const newVotes = { votes: (votesCount += 1) };

    vote(id, newVotes);

    dispatch(notification(content, 1000));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() =>
                handleVoteNotification(
                  anecdote.id,
                  anecdote.content,
                  anecdote.votes
                )
              }
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
