import { Patient } from "../../types";
import MaleIcon from "@mui/icons-material/Male";

import FemaleIcon from "@mui/icons-material/Female";

import EntryDetails from "./EntryDetails";
import { Button } from "@mui/material";
import AddEntryForm from "../AddEntryForm.tsx";

interface Props {
  patientDetails: Patient | undefined | null;
}

function PatientPage({ patientDetails }: Props) {
  return (
    <div>
      {patientDetails && (
        <div>
          <h1>
            {patientDetails.name}{" "}
            {patientDetails.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
          </h1>
          <p>
            ssn: {patientDetails.ssn}
            <br />
            occupation: {patientDetails.occupation}
          </p>
          <AddEntryForm />
          <div>
            <b>entries</b>
            {patientDetails?.entries?.map((entry, id) => (
              <div key={id}>
                <EntryDetails entry={entry} />
              </div>
            ))}
          </div>
        </div>
      )}
      <Button
        color="primary"
        variant="contained"
        style={{ float: "left" }}
        type="button"
      >
        ADD ENTRY
      </Button>
    </div>
  );
}

export default PatientPage;
