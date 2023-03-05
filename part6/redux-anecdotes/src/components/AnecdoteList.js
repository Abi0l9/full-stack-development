import { useDispatch } from "react-redux";
// import { incrementVotes } from "../reducers/anecdoteReducer";
import { newVote } from "../reducers/notificationReducer";
import { voteIncrement } from "../reducers/anecdoteReducer";

const AnecdoteList = ({ anecdotes }) => {
  const dispatch = useDispatch();

  const vote = (id, votes) => {
    dispatch(voteIncrement(id, votes));
  };

  const notification = (content) => {
    dispatch(newVote(content));
  };

  const handleVoteNotification = (id, content, votes) => {
    let votesCount = Number(votes);
    const newVotes = { votes: (votesCount += 1) };

    vote(id, newVotes);
    notification(content);
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
