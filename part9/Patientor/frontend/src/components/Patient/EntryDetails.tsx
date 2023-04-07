import React from "react";
import { Entry } from "../../types";
import HealthCheckEntryComp from "./HealthCheckEntryComp";
import OccupationalHealthcareEntryComp from "./OccupationalHealthcareEntryComp";
import HospitalEntryComp from "./HospitalEntryComp";
import { assertNever } from "../../utils";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComp entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryComp entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryComp entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
