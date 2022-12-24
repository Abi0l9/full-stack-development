import "./App.css";
import { useEffect, useState } from "react";
import Numbers from "./Numbers";
import PersonForm from "./PersonForm";
import Phonebook from "./Phonebook";
import { getContacts, createContact } from "./ContactRequests";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const handleNewInput = (e) => {
    e.target.name === "name"
      ? setNewName(e.target.value)
      : setNewNumber(e.target.value);
  };

  const handleEmptyInputs = () => newName && newNumber;
  const handleDuplicate = () => {
    const duplicate = persons.filter(
      (person) => person.name === newName && person.number === newNumber
    );

    handleEmptyInputs() && duplicate.length < 1
      ? setPersons(
          persons.concat({
            name: newName,
            number: newNumber,
            id: !persons.length ? 1 : persons.at(-1).id + 1,
          })
        )
      : !handleEmptyInputs()
      ? alert("You can't save an empty field")
      : alert(`${newName} is already added to phonebook`);
    return duplicate.length;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDuplicate();

    handleDuplicate() < 1 &&
      // axios.post(baseUrl, { name: newName, number: newNumber });
      handleEmptyInputs() &&
      createContact({
        name: newName,
        number: newNumber,
        id: !persons.length ? 1 : persons.at(-1).id + 1,
      });

    setNewName("");
    setNewNumber("");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    // axios.get(baseUrl).then((response) => setPersons(response.data));
    getContacts(setPersons);
  }, []);

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
