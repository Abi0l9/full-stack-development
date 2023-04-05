import { Patient } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import { useEffect, useState } from "react";
import FemaleIcon from "@mui/icons-material/Female";
import { Diagnosis } from "../../types";
import diagnosisServices from "../../services/diagnoses";

interface Props {
  patientDetails: Patient | undefined | null;
}

function PatientPage({ patientDetails }: Props) {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

  useEffect(() => {
    diagnosisServices.getAll().then((data) => setDiagnosis(data));
  });

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
          <div>
            <b>entries</b>
            {patientDetails?.entries?.map((entry) => (
              <div key={entry.id}>
                <p>
                  {entry.date} - {entry.description}
                </p>
                <ul>
                  {entry?.diagnosisCodes?.map((diag) => (
                    <li key={diag}>
                      {diag} - {diagnosis.map((d) => d.code === diag && d.name)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientPage;
