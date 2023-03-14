import express from "express";
import patientServices from "../services/patients";

const router = express.Router();

router.get("/", (_request, response) => {
  const data = patientServices.getEntries();
  return response.send(data);
});

router.post("/", (_request, response) => {
  response.send("Saving patients' data");
});

export default router;
