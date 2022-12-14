import "./App.css";
import { useState } from "react";

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  // make an array of length anecdotes with all filled with zeros (0)
  let random = selected; //initialize random with selected => 0

  const handleClick = () => {
    random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const handleVotes = () => {
    votes[selected] += 1; //Update first
    setVotes([...votes]); // Make a new copy after each update
  };

  const mostVotes = [...votes].sort((a, b) => a - b)[votes.length - 1]; // sort and get the last element
  // console.log(votes.indexOf(mostVotes)); // get the index of vote with the most votes
  // then, access the anecdotes with that same index.

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br />
      <p>Has {votes[selected]} votes</p>
      <br />
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <div>
        <h2>Anecdote with the most votes</h2>
        {anecdotes[votes.indexOf(mostVotes)]}
        <p>Has {mostVotes} votes</p>
      </div>
    </div>
  );
}

export default App;
