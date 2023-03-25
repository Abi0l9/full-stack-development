import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useMatch,
} from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/Patient/PatientPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  const match = useMatch("/patients/:id");
  const selectedPatient = match
    ? patients.find((pat) => pat.id === match.params.id)
    : null;

  useEffect(() => {
    console.log(selectedPatient);
  });

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/patients/:id"
            element={<PatientPage patientDetails={selectedPatient} />}
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
