import {
  Gender,
  NewPatientEntry,
  HealthCheckEntry,
  HealthCheckRating,
  DiagnosisDetails,
  Entry,
  HospitalEntry,
  Discharge,
  sickLeave,
  OccupationalHealthcareEntry,
} from "./types";

const isString = (str: unknown): str is string => {
  return typeof str === "string" || str instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(gender);
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || typeof rating !== "number" || !isHealthCheckRating(rating)) {
    throw new Error(`Incorrect parameter or missing '${rating}'`);
  }
  return rating;
};

const isHealthCheck = (type: string) => {
  return type === "HealthCheck";
};

const isHospital = (type: string) => {
  return type === "Hospital";
};

const isOccupationalHealthcare = (type: string) => {
  return type === "OccupationalHealthcare";
};

const parseHealthCheck = (str: unknown): "HealthCheck" => {
  if (!str || !isString(str) || !isHealthCheck(str)) {
    throw new Error(`Incorrect parameter or missing '${str}'`);
  }

  return "HealthCheck";
};

const parseOccupationalHealthcare = (
  str: unknown
): "OccupationalHealthcare" => {
  if (!str || !isString(str) || !isOccupationalHealthcare(str)) {
    throw new Error(`Incorrect parameter or missing '${str}'`);
  }

  return "OccupationalHealthcare";
};

const parseHospital = (str: unknown): "Hospital" => {
  if (!str || !isString(str) || !isHospital(str)) {
    throw new Error(`Incorrect parameter or missing '${str}'`);
  }

  return "Hospital";
};

const parseStr = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect parameter or missing '${str}'`);
  }

  return str;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect parameter or missing 'date' `);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect parameter or missing 'gender' `);
  }
  return gender;
};

const parseDiagnosisCode = (
  object: unknown
): Array<DiagnosisDetails["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<DiagnosisDetails["code"]>;
  }

  return object.diagnosisCodes as Array<DiagnosisDetails["code"]>;
};

const parseDischarge = (object: Discharge): Discharge => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect parameter or missing data ");
  } else if (!("date" in object)) {
    throw new Error("Incorrect parameter or missing data 'date' ");
  } else if (!("criteria" in object)) {
    throw new Error("Incorrect parameter or missing data 'criteria' ");
  }

  return object;
};

export const parseSickLeave = (object: sickLeave): sickLeave => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect parameter or missing data ");
  } else if (!("startDate" in object)) {
    throw new Error("Incorrect parameter or missing data 'startDate' ");
  } else if (!("endDate" in object)) {
    throw new Error("Incorrect parameter or missing data 'endDate' ");
  }

  return object;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "ssn" in object &&
    "dateOfBirth" in object &&
    "occupation" in object &&
    "gender" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseStr(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseStr(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseStr(object.occupation),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some parameters missing");
};

export const assertNever = (value: any): never => {
  throw new Error(`Unhandled type included, ${JSON.stringify(value)}`);
};

const healthCheckEntryParser = (object: HealthCheckEntry): HealthCheckEntry => {
  return {
    id: parseStr(object.id),
    date: parseDate(object.date),
    specialist: parseStr(object.specialist),
    type: parseHealthCheck(object.type),
    description: parseStr(object.description),
    diagnosisCodes: parseDiagnosisCode(object.diagnosisCodes),
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
  };
};

const hospitalEntryParser = (object: HospitalEntry): HospitalEntry => {
  return {
    id: parseStr(object.id),
    date: parseDate(object.date),
    specialist: parseStr(object.specialist),
    type: parseHospital(object.type),
    description: parseStr(object.description),
    diagnosisCodes: parseDiagnosisCode(object.diagnosisCodes),
    discharge: parseDischarge(object.discharge),
  };
};

const occupationalHealthcareParser = (
  object: OccupationalHealthcareEntry
): OccupationalHealthcareEntry => {
  return {
    id: parseStr(object.id),
    date: parseDate(object.date),
    specialist: parseStr(object.specialist),
    type: parseOccupationalHealthcare(object.type),
    description: parseStr(object.description),
    diagnosisCodes: parseDiagnosisCode(object.diagnosisCodes),
    employerName: parseStr(object.employerName),
    sickLeave: object.sickLeave && parseSickLeave(object.sickLeave),
  };
};

export const entryParser = (object: Entry): Entry => {
  switch (object.type) {
    case "HealthCheck":
      return healthCheckEntryParser(object);
    case "Hospital":
      return hospitalEntryParser(object);
    case "OccupationalHealthcare":
      return occupationalHealthcareParser(object);

    default:
      return assertNever(object);
  }
};

export default toNewPatientEntry;
