const personRouter = require("express").Router();
const Phonebook = require("../models/phonebook");

const getAllContactsJSON = (response) =>
  Phonebook.find({}).then((result) => response.json(result));

personRouter.get("", (_request, response) => getAllContactsJSON(response));

personRouter.get("/info", (_request, response) => {
  Phonebook.find({}).then((result) => {
    const date = new Date();
    const len = result.length;
    const message = `Phonebook has info for ${len} people`;
    response.send(`${message} \n${date}`);
  });
});

personRouter.get("/:personId", (request, response, next) => {
  const personId = request.params.personId;

  Phonebook.findById(personId)
    .then((result) => {
      if (result) response.json(result);
      else response.status(404).end();
    })
    .catch((error) => next(error));
  // .catch((error) => errMsgCode(response, personId));
});

personRouter.delete("/:personId", (request, response, next) => {
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

personRouter.post("", (request, response, next) => {
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

personRouter.put("/:personId", (request, response, next) => {
  const personId = request.params.personId;
  const body = request.body;

  const newPerson = {
    name: body.name,
    number: body.number,
  };
  const matchReg = () => {
    const pattern = /^(\d{2}||\d{3})-(\d{7}||\d{8})$/;
    return pattern.test(body.number);
  };

  !body.name || !body.number
    ? response.json({ message: "missing field" }).status(400).end()
    : !matchReg()
    ? response
        .json({ message: "Phone number format is invalid" })
        .status(400)
        .end()
    : Phonebook.findByIdAndUpdate(personId, newPerson, { new: true })
        .then((updatedPerson) => response.json(updatedPerson))
        .catch((error) => next(error));
});

module.exports = personRouter;
