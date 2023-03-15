"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const id = (0, uuid_1.v1)();
const data = patients_1.default;
const getEntries = () => {
    return data;
};
const findById = (id) => {
    const patient = data.find((pat) => pat.id === id);
    return patient;
};
const addEntry = (entry) => {
    const newPatientEntry = Object.assign({ id }, entry);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
exports.default = { getEntries, findById, addEntry };
