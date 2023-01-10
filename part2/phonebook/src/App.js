import "./App.css";
import { useEffect, useState } from "react";
import Numbers from "./Numbers";
import PersonForm from "./PersonForm";
import Phonebook from "./Phonebook";
import { getContacts, createContact, updateContact } from "./ContactRequests";
import Notification from "./Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState({
    message: "",
    type: "",
  });

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

  const newUpdate = (updatedName, dupId) => {
    const confirm = window.confirm(
      `${updatedName} is already added to phonebook, would you like to replace it?`
    );
    if (confirm) {
      updateContact(dupId, newContact);
      message("Contact updated, successfully!", "success");
    }
  };
  let dup;
  const handleDuplicate = () => {
    const duplicate = persons.filter(
      (person) => person.name === newName //&& person.number === newNumber
    );
    dup = duplicate;
    const duplicateId = duplicate[0]?.id;

    // Add new contact if fields arent empty and duplicate is none
    handleEmptyInputs();
      
    // If field is empty
    !handleEmptyInputs() && message(`You can't save an empty field`, "error");

    //update when duplicate is true
    duplicateId && newUpdate(newName, duplicateId);
    return duplicate.length;
  };

  const duplicateAndEmptyInputs = () =>
    handleDuplicate() < 1 && handleEmptyInputs();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDuplicate();

    duplicateAndEmptyInputs() &&
      createContact(newContact)
        .then((result) => {
          message(`${newName} has been added to phonebook.`, "success");
          dup.length < 1 &&
          setPersons(persons.concat(newContact));

          
        }
        )
        .catch((error) => {
          const errMsgs = error.response.data
            .split("\n")[7]
            .split(".")[0]
            .split(":");

          errMsgs.splice(0, 1);
          //console.log(errMsgs);
          message(errMsgs.join(" "), "error");
        });

    setNewName("");
    setNewNumber("");
  };

  const message = (msg, type) => {
    setError({
      message: msg,
      type: type,
    });
    setTimeout(() => {
      setError({
        message: "",
        type: "",
      });
    }, 5000);
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
      <div>
        <Phonebook search={search} handleSearch={handleSearch} />
        <Notification message={error.message} type={error.type} />
      </div>

      <br />
      <br />
      <PersonForm
        handleSubmit={handleSubmit}
        handleNewInput={handleNewInput}
        newName={newName}
        newNumber={newNumber}
      />

      <Numbers message={message} persons={persons} search={search} />
    </div>
  );
}

export default App;
