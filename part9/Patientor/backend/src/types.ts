export interface DiagnosisDetails {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Entry {}

export interface PatientDetails {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type NewPatientEntry = Omit<PatientDetails, "id" | "entries">;
export type NonSensitivePatient = Omit<PatientDetails, "id" | "entries">;
