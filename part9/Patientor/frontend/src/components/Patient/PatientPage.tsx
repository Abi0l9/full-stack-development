import { Patient } from "../../types";

interface Props {
  patientDetails: Patient;
}

function PatientPage({ patientDetails }: Props) {
  return (
    <div>
      <h1>Patientor</h1>
      <button>Home</button>
      <h3>Name Holder</h3>
      <p>Other details</p>
    </div>
  );
}

export default PatientPage;
