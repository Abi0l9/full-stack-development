"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (str) => {
    return typeof str === "string" || str instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (gender) => {
    return Object.values(types_1.Gender)
        .map((g) => g.toString())
        .includes(gender);
};
const parseStr = (str) => {
    if (!str || !isString(str)) {
        throw new Error(`Incorrect parameter or missing '${str}'`);
    }
    return str;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect parameter or missing 'date' `);
    }
    return date;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error(`Incorrect parameter or missing 'gender' `);
    }
    return gender;
};
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in object &&
        "ssn" in object &&
        "dateOfBirth" in object &&
        "occupation" in object &&
        "gender" in object) {
        const newEntry = {
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
exports.default = toNewPatientEntry;
