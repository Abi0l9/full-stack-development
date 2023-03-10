import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const clearFields = () => {
    setValue("");
  };

  return {
    clearFields,
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/countries")
      .then((response) => setCountry(response.data))
      .catch((error) => console.log(error.message));
  }, []);

  if (name) {
    let data = country.find(
      (count) => count.name.common.toLowerCase() === name.toLowerCase()
    );
    if (data) {
      const { name, capital, population, flag } = data;
      const main = {
        found: true,
        data: {
          name: name.common,
          capital: capital[0],
          population,
          flag,
        },
      };
      return main;
    }
  }

  return { found: false };
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const { clearFields, ...nameInput } = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
    clearFields();
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
