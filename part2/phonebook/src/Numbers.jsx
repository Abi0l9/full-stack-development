import { useEffect, useState } from "react";
import { removeContact } from "./ContactRequests";

const Numbers = ({ persons, search }) => {
  const [contacts, setContacts] = useState(persons);
  // console.log(contacts);

  const handleRemove = (id, name, listId) => {
    removeContact(id, name);
    persons.splice(listId, 1);
    setContacts([...persons]);
  };

  useEffect(() => {
    setContacts([...persons]);
  }, [persons]);

  return (
    <div>
      <h2>Numbers</h2>
      {contacts
        .filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((person, id) => (
          <div key={person.name + " " + person.id}>
            {person.name} {person.number}{" "}
            {/* <button onClick={() => removeContact(person.id, person.name)}> */}
            <button onClick={() => handleRemove(person.id, person.name, id)}>
              delete
            </button>
          </div>
        ))}
    </div>
  );
};
export default Numbers;
