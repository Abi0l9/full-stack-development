import "./App.css";
import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "09065805142" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNewInput = (e) => {
    e.target.name === "name"
      ? setNewName(e.target.value)
      : setNewNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const duplicate = persons.filter((person) => person.name === newName);

    newName && duplicate.length < 1
      ? setPersons(persons.concat({ name: newName, number: newNumber }))
      : alert(`${newName} is already added to phonebook`);

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input name="name" value={newName} onChange={handleNewInput} />
        </div>
        <div>
          number:{" "}
          <input name="number" value={newNumber} onChange={handleNewInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.length
        ? persons.map((person) => (
            <div key={person.name}>
              {person.name} {person.number}
            </div>
          ))
        : null}
    </div>
  );
}

export default App;
