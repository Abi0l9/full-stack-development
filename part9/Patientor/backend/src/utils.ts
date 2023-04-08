import {
  Gender,
  NewPatientEntry,
  HealthCheckEntry,
  HealthCheckRating,
  DiagnosisDetails,
  Entry,
  HospitalEntry,
  Discharge,
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

const parseHealthCheck = (str: unknown): "HealthCheck" => {
  if (!str || !isString(str) || !isHealthCheck(str)) {
    throw new Error(`Incorrect parameter or missing '${str}'`);
  }

  return "HealthCheck";
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
  if (
    !object ||
    typeof object !== "object" ||
    !("date" in object) ||
    !("criteria" in object)
  ) {
    throw new Error("Incorrect parameter or missing data ");
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

export const healthCheckEntryParser = (
  object: HealthCheckEntry
): HealthCheckEntry => {
  switch (object.type) {
    case "HealthCheck":
      return {
        id: parseStr(object.id),
        date: parseDate(object.date),
        specialist: parseStr(object.specialist),
        type: parseHealthCheck(object.type),
        description: parseStr(object.description),
        diagnosisCodes: parseDiagnosisCode(object.diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };

    default:
      return assertNever(object);
  }
};

export const hospitalEntryParser = (object: HospitalEntry): HospitalEntry => {
  switch (object.type) {
    case "Hospital":
      return {
        id: parseStr(object.id),
        date: parseDate(object.date),
        specialist: parseStr(object.specialist),
        type: parseHospital(object.type),
        description: parseStr(object.description),
        diagnosisCodes: parseDiagnosisCode(object.diagnosisCodes),
        discharge: parseDischarge(object.discharge),
      };

    default:
      return assertNever(object.type);
  }
};

export const entryParser = (object: Entry): Entry => {
  switch (object.type) {
    case "HealthCheck":
      return healthCheckEntryParser(object);
    case "Hospital":
      return hospitalEntryParser(object);

    default:
      return assertNever(object.type);
  }
};

export default toNewPatientEntry;
