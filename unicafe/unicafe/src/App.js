import "./App.css";
import { useState } from "react";
import Statistics from "./components/Statistics";

function App() {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAllClicks] = useState([]);
  let average = [good, bad].reduce((a, b) => a + b, 0) / 3;
  let positive = good ? (good / allClicks.length) * 100 : 0;

  const handleClick = (fn, state) => {
    fn(state + 1);

    setAllClicks(allClicks.concat("state"));
  };

  const handleBadClick = (fn, state) => {
    fn(state - 1);
    setAllClicks(allClicks.concat("state"));
  };

  const allProps = {
    good: good,
    bad: bad,
    neutral: neutral,
    allClicks: allClicks.length,
    average: average,
    positive: positive,
  };

  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <button onClick={() => handleClick(setGood, good)}>good</button>
        <button onClick={() => handleClick(setNeutral, neutral)}>
          neutral
        </button>
        <button onClick={() => handleBadClick(setBad, bad)}>bad</button>
      </div>
      <br />
      <Statistics props={allProps} />
    </div>
  );
}

export default App;
