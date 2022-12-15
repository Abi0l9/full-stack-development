import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

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

  const handleForm = () => {
    const searchResults = countries
      .filter((country) =>
        country.name.common.toLowerCase().includes(input.toLowerCase())
      )
      .map((country) => country.name.common);

    setResults(searchResults);
  };

  console.log(results);
  return (
    <div>
      <form onChange={handleForm}>
        <label>find countries </label>
        <input type="text" value={input} onChange={handleChange} />
      </form>
      <div>
        {results.length
          ? results.map((result) => <div key={result}>{result}</div>)
          : "Nothing to display!"}
      </div>
    </div>
  );
}

export default App;
