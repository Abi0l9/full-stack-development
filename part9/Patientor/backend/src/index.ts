// import express from "express";
import express = require("express");
import cors = require("cors");
import patientsRouter from "./routes/patients";
import diagnosesRouter from "./routes/diagnoses";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_request, response) =>
  response.status(200).send("pong").end()
);
app.use("/api/patients", patientsRouter);
app.use("/api/diagnoses", diagnosesRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Listening to port ", PORT);
});
