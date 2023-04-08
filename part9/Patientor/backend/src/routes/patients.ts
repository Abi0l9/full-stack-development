import express = require("express");
import patientServices from "../services/patients";
import toNewPatientEntry, { entryParser } from "../utils";

const router = express.Router();

router.get("/", (_request, response) => {
  const data = patientServices.getEntries();
  return response.send(data);
});

router.get("/:id", (request, response) => {
  const id = request.params.id;
  const data = patientServices.findById(id);

  if (data) return response.send(data);
  else return response.sendStatus(404);
});

router.post("/:id/entries", (request, response) => {
  const body = request.body;
  const id = request.params.id;

  try {
    const newEntry = entryParser(body);
    const data = patientServices.addEntryById(id, newEntry);
    if (data) response.send(data);
    else response.sendStatus(404);
  } catch (error) {
    let errorMsg = "Something occured: ";
    if (error instanceof Error) {
      errorMsg += error.message;
    }
    response.json({ error: errorMsg });
  }
});

router.post("/", (request, response) => {
  try {
    const newEntry = toNewPatientEntry(request.body);
    const addedEntry = patientServices.addEntry(newEntry);
    response.json(addedEntry);
  } catch (error) {
    let errorMsg = "Something occured: ";
    if (error instanceof Error) {
      errorMsg += error.message;
    }
    response.json({ error: errorMsg });
  }
});

export default router;
