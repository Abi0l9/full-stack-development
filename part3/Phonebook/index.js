const Phonebook = require("./models/note");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("build"));

const cors = require("cors");
app.use(cors());
const morgan = require("morgan");

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

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
app.use(errorHandler);

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

app.get("/api/persons/:personId", (request, response, next) => {
  const personId = request.params.personId;

  const person = Phonebook.findById(personId)
    .then((result) => {
      if (result) response.json(result);
      else response.status(404).end();
    })
    .catch((error) => next(error));
  // .catch((error) => errMsgCode(response, personId));
});

app.delete("/api/persons/:personId", (request, response, next) => {
  const personId = request.params.personId;

  Phonebook.findByIdAndRemove(personId)
    .then((result) => {
      if (result) {
        response.json({ message: "deleted successfully" }).status(204).end();
      } else {
        response.json({ message: "content not found" }).status(404).end();
      }
    })
    .catch((error) => next(error));
  // .catch((error) => errMsgCode(response, personId));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  const person = new Phonebook({
    name: body.name,
    number: body.number,
  });

  if (body.name === "" || !body.number) {
    return response.status(400).json({ error: "content missing" });
  }

  person
    .save()
    .then((result) => response.json(result))
    .catch((error) => next(error));
});

app.put("/api/persons/:personId", (request, response, next) => {
  const personId = request.params.personId;
  const body = request.body;

  const newPerson = {
    name: body.name,
    number: body.number,
  };

  !body.name || !body.number
    ? response.json({ message: "missing field" }).status(400).end()
    : Phonebook.findByIdAndUpdate(personId, newPerson, { new: true })
        .then((updatedPerson) => response.json(updatedPerson))
        .catch((error) => next(error));
});

app.use(unknownEndpoint);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("\n App running on port ", PORT));
