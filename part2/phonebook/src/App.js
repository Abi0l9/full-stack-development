import "./App.css";
import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNewInput = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newName && setPersons(persons.concat({ name: newName }));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="name" value={newName} onChange={handleNewInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.length
        ? persons.map((person) => <div key={person.name}>{person.name}</div>)
        : null}
    </div>
  );
}

export default App;
