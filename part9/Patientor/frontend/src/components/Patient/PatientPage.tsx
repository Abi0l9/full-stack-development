import { Patient } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

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
          <p>
            <b>entries</b>
            {patientDetails.entries.map((entry) => (
              <div key={entry.id}>
                <p>
                  {entry.date} - {entry.description}
                </p>
                <ul>
                  {entry.diagnosisCodes?.map((diag) => (
                    <li key={diag}>{diag}</li>
                  ))}
                </ul>
              </div>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}

export default PatientPage;
