const Phonebook = require("./models/note");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("build"));

const cors = require("cors");
app.use(cors());
const morgan = require("morgan");

const logger = (tokens, request, response) => {
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, "content-length"),
    "-",
    tokens["response-time"](request, response),
    "ms",
    JSON.stringify(request.body),
    "\n ######## \n",
  ].join(" ");
};

app.use(morgan(logger));

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

const getAllContactsJSON = (response) =>
  Phonebook.find({}).then((result) => response.json(result));

const getAllContactsObj = (response) =>
  Phonebook.find({}).then((result) => JSON.stringify(result));

app.get("/api/persons", (_request, response) => getAllContactsJSON(response));

app.get("/api/info", (_request, response) => {
  Phonebook.find({}).then((result) => {
    const date = new Date();
    const len = result.length;
    const message = `Phonebook has info for ${len} people`;
    response.send(`${message} \n${date}`);
  });
});

app.get("/api/persons/:personId", (request, response) => {
  const personId = request.params.personId * 1;

  const person = Phonebook.findById(request.params.personId)
    .then((result) => response.json(result))
    .catch((error) => errMsgCode(response, request.params.personId));
});

app.delete("/api/persons/:personId", (request, response) => {
  const personId = request.params.personId;

  Phonebook.findByIdAndDelete(personId)
    .then((result) => response.json(result))
    .catch((error) => errMsgCode(response, personId));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const person = new Phonebook({
    name: body.name,
    number: body.number,
  });

  if (body.name === "") {
    return response.status(400).json({ error: "content missing" });
  }

  person
    .save()
    .then((result) => response.json(result))
    .catch((error) => console.log("Something happened..."));
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("\n App running on port ", PORT));
