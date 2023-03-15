"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from "express";
const express = require("express");
const cors = require("cors");
const patients_1 = __importDefault(require("./routes/patients"));
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
const app = express();
app.use(cors());
app.use(express.json());
app.get("/api/ping", (_request, response) => response.status(200).send("pong").end());
app.use("/api/patients", patients_1.default);
app.use("/api/diagnoses", diagnoses_1.default);
const PORT = 3001;
app.listen(PORT, () => {
    console.log("Listening to port ", PORT);
});
