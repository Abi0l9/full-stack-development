import React from "react";
import { Patient } from "../../types";
import MaleIcon from "@mui/icons-material/Male";

import FemaleIcon from "@mui/icons-material/Female";

import EntryDetails from "./EntryDetails";
import {
  Button,
  Box,
  Dialog,
  Select,
  DialogContent,
  DialogTitle,
  DialogActions,
  MenuItem,
  Typography,
} from "@mui/material";
import AddEntryForm from "../AddEntryForm.tsx";

interface Props {
  patientDetails: Patient | undefined | null;
}

type EntryModalProps = {
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  modalState: boolean;
  setmodalState: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenForm: (value: React.SetStateAction<boolean>) => void;
};

const EntryModal = ({
  selectedValue,
  setSelectedValue,
  modalState,
  setmodalState,
  setOpenForm,
}: EntryModalProps) => {
  const entries = ["Hospital", "HealthCheck", "OccupationalHealthcare"];

  const onModalClose = () => {
    setmodalState(false);
    setOpenForm(true);
  };

  return (
    <Dialog open={modalState}>
      <DialogTitle>
        <Typography>Choose an entry type:</Typography>
      </DialogTitle>
      <DialogContent>
        <Select
          label="entryType"
          fullWidth
          name="entryType"
          value={selectedValue}
          placeholder="entry..."
          onChange={(e) =>
            typeof e.target.value === "string" &&
            setSelectedValue(e.target.value)
          }
        >
          {entries.map((entry) => (
            <MenuItem key={entry} value={entry} onClick={onModalClose}>
              {entry === "OccupationalHealthcare"
                ? "Occupational Healthcare"
                : entry}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          variant="contained"
          style={{ float: "right" }}
          type="button"
          onClick={() => setmodalState(false)}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function PatientPage({ patientDetails }: Props) {
  const [selectedValue, setSelectedValue] = React.useState("");
  const [openForm, setOpenForm] = React.useState(false);
  const [modalState, setmodalState] = React.useState(false);

  const formDisplay = { display: openForm ? "" : "none" };
  const btnDisplay = { display: openForm ? "none" : "" };

  const handleModalDisplay = () => {
    setmodalState(!modalState);
  };

  return (
    <div>
      {patientDetails && (
        <div>
          <h1>
            {patientDetails.name}{" "}
            {patientDetails.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
          </h1>
          <Box sx={formDisplay}>
            <EntryModal
              setOpenForm={setOpenForm}
              modalState={modalState}
              setmodalState={setmodalState}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          </Box>
          <p>
            ssn: {patientDetails.ssn}
            <br />
            occupation: {patientDetails.occupation}
          </p>
          <Box sx={formDisplay}>
            <AddEntryForm
              id={patientDetails?.id}
              setSelectedValue={setSelectedValue}
              selectedValue={selectedValue}
              setOpenForm={setOpenForm}
            />
          </Box>
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
      <Box sx={btnDisplay}>
        <Button
          color="primary"
          variant="contained"
          style={{ float: "left" }}
          type="button"
          onClick={handleModalDisplay}
        >
          ADD ENTRY
        </Button>
      </Box>
    </div>
  );
}

export default PatientPage;
