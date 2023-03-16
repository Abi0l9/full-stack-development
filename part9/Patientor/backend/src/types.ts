export interface DiagnosisDetails {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientDetails {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NewPatientEntry = Omit<PatientDetails, "id">;