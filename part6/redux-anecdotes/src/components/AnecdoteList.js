import { /*useSelector,*/ useDispatch } from "react-redux";
import { incrementVotes } from "../reducers/anecdoteReducer";
import { newVote } from "../reducers/notificationReducer";

const AnecdoteList = ({ anecdotes }) => {
  // const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(incrementVotes(id));
  };

  const notification = (content) => {
    dispatch(newVote(content));
  };

  const handleVoteNotification = (id, content) => {
    vote(id);
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
                handleVoteNotification(anecdote.id, anecdote.content)
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
