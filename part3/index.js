const { request, response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());
const morgan = require("morgan");

app.use(morgan("tiny"));

// morgan.token("host", (request, response) => request.hostname);
const PORT = 3001;

let persons = [
  {
    id: 1,
    name: "Khalifah",
    number: "09065909090",
  },
  {
    id: 2,
    name: "Kashy",
    number: "08090765432",
  },
  {
    id: 3,
    name: "Wale",
    number: "09058786758",
  },
  {
    id: 4,
    name: "Abiola",
    number: "08078685848",
  },
];

const errMsgCode = (response, id) => {
  return (
    response.status(404) &&
    response.json({ error: `Contact with id ${id} not found!` })
  );
};

app.get("/api/persons", (_request, response) => response.json(persons));

app.get("/api/info", (_request, response) => {
  const phonebookLength = persons.length;
  const date = new Date();
  const message = `Phonebook has info for ${phonebookLength} people`;
  response.send(`${message} \n${date}`);
});

app.get("/api/persons/:personId", (request, response) => {
  const personId = request.params.personId * 1;
  const person = persons.find((person) => person.id === personId);

  (person && response.json(person)) || errMsgCode(response, personId);
});

app.delete("/api/persons/:personId", (request, response) => {
  const personId = request.params.personId * 1;

  const getId = persons.map((n) => n.id).includes(personId);

  const person = persons.filter((person) => person.id !== personId);
  persons = person;
  console.log(getId, persons);

  (getId && response.status(200).json(persons)) ||
    errMsgCode(response, personId);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  body.id = Math.floor(Math.random() * 25) + 1;
  const confirmUniqueId = persons.filter((person) => person.id === body.id);

  const confirmMissingUnique = persons.filter(
    (person) => person.name === body.name
  );

  confirmUniqueId.length > 0
    ? response.status(422).json({ error: "id not unique!" })
    : confirmMissingUnique.length > 0
    ? response.status(422).json({ error: "name must be unique" })
    : !body.name || !body.number
    ? response.status(422).json({ error: "name/number is missing!" })
    : persons.push(body) && response.json(persons);
});

app.listen(PORT, console.log("\n App running on port ", PORT));
