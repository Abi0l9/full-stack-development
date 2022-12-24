import "./App.css";
import { useEffect, useState } from "react";
import Numbers from "./Numbers";
import PersonForm from "./PersonForm";
import Phonebook from "./Phonebook";
import { getContacts, createContact, updateContact } from "./ContactRequests";

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

  const newContact = {
    name: newName,
    number: newNumber,
    id: !persons.length ? 1 : persons.at(-1).id + 1,
  };

  const handleEmptyInputs = () => newName && newNumber;

  const handleDuplicate = () => {
    const duplicate = persons.filter(
      (person) => person.name === newName //&& person.number === newNumber
    );
    const duplicateId = duplicate[0]?.id;

    // Add new contact if fields arent empty and duplicate is none
    handleEmptyInputs() &&
      duplicate.length < 1 &&
      setPersons(persons.concat(newContact));

    // If field is empty
    !handleEmptyInputs() && alert("You can't save an empty field");

    //update when duplicate is true
    duplicate.length &&
      window.confirm(
        `${newName} is already added to phonebook, would you like to replace it?`
      ) &&
      updateContact(duplicateId, newContact);
    return duplicate.length;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDuplicate();

    handleDuplicate() < 1 &&
      handleEmptyInputs() &&
      createContact(newContact);

    setNewName("");
    setNewNumber("");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
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
