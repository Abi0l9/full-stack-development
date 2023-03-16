import { Gender, NewPatientEntry } from "./types";

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

export default toNewPatientEntry;
