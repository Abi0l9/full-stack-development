import { useState, useEffect } from "react";
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

const useResource = (type) => {
  const baseUrl =
    type === "notes"
      ? "http://localhost:3005/notes"
      : "http://localhost:3005/persons";

  const [resources, setResources] = useState([]);

  const create = async (resource) => {
    const request = await axios.post(baseUrl, resource);
    setResources(resources.concat(request.data));
  };

  const retrieve = async () => {
    const request = await axios.get(baseUrl);
    setResources(request.data);
  };

  const service = {
    create,
    retrieve,
  };

  return [resources, service];
};

const App = () => {
  const { clearFields: clearContentFields, ...content } = useField("text");
  const { clearFields: clearNameFields, ...name } = useField("text");
  const { clearFields: clearNumberFields, ...number } = useField("text");

  const [notes, noteService] = useResource("notes");
  const [persons, personService] = useResource("persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    clearContentFields();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
    clearNameFields();
    clearNumberFields();
  };

  useEffect(() => {
    noteService.retrieve();
    personService.retrieve();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} required />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} required /> <br />
        number <input {...number} required />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
