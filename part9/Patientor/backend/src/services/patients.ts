import patientsData from "../data/patients";
import {
  PatientDetails,
  NewPatientEntry,
  NonSensitivePatient,
  Entry,
} from "../types";
import { v1 as uuid } from "uuid";

const id = uuid();

const data: PatientDetails[] = patientsData;

const getEntries = () => {
  return data;
};

const findById = (id: string): NonSensitivePatient | undefined => {
  const patient = data.find((pat) => pat.id === id);

  return patient;
};

const addEntryById = (id: string, obj: Entry) => {
  const patient = data.find((pat) => pat.id === id);

  patient?.entries.push(obj);

  return patient;
};

const addEntry = (entry: NewPatientEntry): PatientDetails => {
  const newPatientEntry = {
    id,
    entries: [],
    ...entry,
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default { getEntries, findById, addEntry, addEntryById };
