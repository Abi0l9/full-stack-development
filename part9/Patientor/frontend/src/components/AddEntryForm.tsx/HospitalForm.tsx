import React from "react";
import { TextField, InputLabel, Button, Box } from "@mui/material";
import { AddEntryFormProps } from "./entryTypes";
import { HospitalEntry } from "../../types";
import patientServices from "./../../services/patients";

const HospitalForm = ({
  id,
  setSelectedValue,
  setOpenForm,
}: AddEntryFormProps) => {
  const [date, setDate] = React.useState("");
  const [specialist, setSpecialist] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [dischargeDate, setDischargeDate] = React.useState("");
  const [criteria, setCriteria] = React.useState("");
  const [diagnosisCodes, setDiagnosisCodes] = React.useState("");

  const clearForm = () => {
    (document.getElementById("form") as HTMLFormElement).reset();
  };

  const closeForm = () => {
    setOpenForm(false);
    setSelectedValue("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: HospitalEntry = {
      id,
      date,
      specialist,
      type: "Hospital",
      description,
      diagnosisCodes: diagnosisCodes.split(","),
      discharge: { date: dischargeDate, criteria },
    };

    try {
      patientServices.addEntry(id, data);
      setSelectedValue("");
      clearForm();
      closeForm();
    } catch (error) {
      let errMsg = "Something occured, ";
      if (error instanceof Error) {
        errMsg += error.message;
      }
      console.log(errMsg);
    }
  };

  return (
    <div>
      <Box sx={{ border: 1, marginBottom: "5px", p: 5 }}>
        <form onSubmit={handleSubmit} id="form">
          <TextField
            type="date"
            fullWidth
            name="date"
            variant="standard"
            onChange={(e) =>
              typeof e.target.value === "string" && setDate(e.target.value)
            }
          />
          <TextField
            name="specialist"
            type="text"
            label="Specialist"
            fullWidth
            variant="standard"
            onChange={(e) =>
              typeof e.target.value === "string" &&
              setSpecialist(e.target.value)
            }
          />

          <TextField
            name="description"
            type="text"
            label="Description"
            fullWidth
            variant="standard"
            onChange={(e) =>
              typeof e.target.value === "string" &&
              setDescription(e.target.value)
            }
          />
          <TextField
            name="diagnosisCodes"
            type="text"
            label="Diagnosis Codes"
            fullWidth
            variant="standard"
            onChange={(e) =>
              typeof e.target.value === "string" &&
              setDiagnosisCodes(e.target.value)
            }
          />
          <InputLabel style={{ marginTop: 20 }}>Discharge Details</InputLabel>
          <Box
            sx={{
              marginTop: "4px",
            }}
          >
            <TextField
              type="date"
              name="dischargeDate"
              variant="standard"
              onChange={(e) =>
                typeof e.target.value === "string" &&
                setDischargeDate(e.target.value)
              }
            />
            <TextField
              type="text"
              fullWidth
              name="Criteria"
              label="Criteria"
              variant="standard"
              onChange={(e) =>
                typeof e.target.value === "string" &&
                setCriteria(e.target.value)
              }
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              marginTop: "4px",
              justifyContent: "space-between",
            }}
          >
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={closeForm}
            >
              Cancel
            </Button>

            <Button type="submit" variant="contained">
              Add
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default HospitalForm;
