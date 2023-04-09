import { HealthCheckRating } from "../../types";

interface options {
  value: string;
  label: string;
}

export const entryTypeOptions: options[] = [
  "Hospital",
  "Health",
  "OccupationalHealthcare",
].map((entry) => {
  if (entry === "OccupationalHealthcare") {
    return {
      label: "Occupational Healthcare",
      value: entry,
    };
  }
  return {
    label: entry,
    value: entry,
  };
});

interface HealthCheckRatingOptionType {
  value: number;
  label: string;
}

export const test = Object.keys(HealthCheckRating)
  .filter((k) => isNaN(Number(k)))
  .map((v, idx) => ({
    label: v,
    value: idx,
  }));

export const healthCheckRatingOptions: HealthCheckRatingOptionType[] =
  Object.keys(HealthCheckRating)
    .filter((k) => isNaN(Number(k)))
    .map((v, idx) => ({
      label: v,
      value: idx,
    }));
