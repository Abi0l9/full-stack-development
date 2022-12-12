import "./App.css";
import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [search, setSearch] = useState("");

  const handleNewInput = (e) => {
    e.target.name === "name"
      ? setNewName(e.target.value)
      : setNewNumber(e.target.value);
  };

  const handleDuplicate = () => {
    const duplicate = persons.filter((person) => person.name === newName);

    newName && duplicate.length < 1
      ? setPersons(persons.concat({ name: newName, number: newNumber }))
      : alert(`${newName} is already added to phonebook`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDuplicate();

    setNewName("");
    setNewNumber("");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with
        <input type="text" value={search} onChange={handleSearch} />
      </div>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          name: <input name="name" value={newName} onChange={handleNewInput} />
        </div>
        <div>
          number:
          <input name="number" value={newNumber} onChange={handleNewInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter((person) =>
          person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
    </div>
  );
}

export default App;
