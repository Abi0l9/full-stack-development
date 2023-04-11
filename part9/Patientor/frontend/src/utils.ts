import diagnosisServices from "./services/diagnoses";

export const assertNever = (value: never): never => {
  throw new Error(`Unhandled type included`);
};

export const diagnosisList = async () => {
  const request = await diagnosisServices.getAll();
  const codes = request.map((d) => d.code);
  return codes;
};
