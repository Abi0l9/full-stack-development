import patientsData from "../data/patients";
import { PatientDetails } from "../types";

const data: PatientDetails[] = patientsData;

const getEntries = () => {
  return data;
};

export default { getEntries };
