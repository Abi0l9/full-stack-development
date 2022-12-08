import "./App.css";
import { useState } from "react";

function App() {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (fn, state) => {
    fn(state + 1);
  };

  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <button onClick={() => handleClick(setGood, good)}>good</button>
        <button onClick={() => handleClick(setNeutral, neutral)}>
          neutral
        </button>
        <button onClick={() => handleClick(setBad, bad)}>bad</button>
      </div>
      <br />
      <div>
        <h2>statistics</h2>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
      </div>
    </div>
  );
}

export default App;
