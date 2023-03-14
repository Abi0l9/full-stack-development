import express from "express";
import diagnosisServices from "../services/diagnoses";

const router = express.Router();

router.get("/", (_request, response) => {
  const data = diagnosisServices.getEntries();
  return response.send(data);
});

export default router;
