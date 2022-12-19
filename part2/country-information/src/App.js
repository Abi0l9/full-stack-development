import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Countries from "./Countries";
import RandomCountry from "./RandomCountry";

function App() {
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    console.log("event started");
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
    console.log("Completed");
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setInput("");
  };

  return (
    <div style={{ marginLeft: 10 }}>
      <form onSubmit={handleSubmit}>
        <label>find countries </label>
        <input type="text" value={input} onChange={handleChange} />
      </form>
      <div>
        {input ? (
          <Countries countries={countries} setInput={setInput} input={input} />
        ) : (
          <RandomCountry countries={countries} />
        )}
      </div>
    </div>
  );
}

export default App;
