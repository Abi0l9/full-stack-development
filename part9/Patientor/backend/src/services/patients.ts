import patientsData from "../data/patients";
import { PatientDetails, NewPatientEntry, NonSensitivePatient } from "../types";
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

const addEntry = (entry: NewPatientEntry): PatientDetails => {
  const newPatientEntry = {
    id,
    entries: [],
    ...entry,
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default { getEntries, findById, addEntry };
