import diagnosesData from "../data/diagnoses";

import { DiagnosisDetails } from "../types";

const diagnoses: DiagnosisDetails[] = diagnosesData;

const getEntries = () => {
  return diagnoses;
};

export default {
  getEntries,
};
