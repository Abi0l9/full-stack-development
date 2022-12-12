import "./App.css";
import { useState } from "react";
import Numbers from "./Numbers";
import PersonForm from "./PersonForm";
import Phonebook from "./Phonebook";

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
      <Phonebook search={search} handleSearch={handleSearch} />

      <br />
      <br />
      <PersonForm
        handleSubmit={handleSubmit}
        handleNewInput={handleNewInput}
        newName={newName}
        newNumber={newNumber}
      />

      <Numbers persons={persons} search={search} />
    </div>
  );
}

export default App;
