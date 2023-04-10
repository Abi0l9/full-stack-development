import React from "react";
import { TextField, InputLabel, Button, Box } from "@mui/material";
import { AddEntryFormProps } from "./entryTypes";
import { OccupationalHealthcareEntry } from "../../types";

const OccupationalHealthcareForm = ({
  id,
  setSelectedValue,
  setOpenForm,
}: AddEntryFormProps) => {
  const [date, setDate] = React.useState("");
  const [specialist, setSpecialist] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [diagnosisCodes, setDiagnosisCodes] = React.useState("");
  const [employerName, setEmployerName] = React.useState("");

  const clearForm = () => {
    (document.getElementById("form") as HTMLFormElement).reset();
  };

  const closeForm = () => {
    setOpenForm(false);
    setSelectedValue("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: OccupationalHealthcareEntry = {
      id,
      date,
      specialist,
      type: "OccupationalHealthcare",
      description,
      employerName,
      diagnosisCodes: diagnosisCodes.split(","),
      sickLeave: { startDate, endDate },
    };

    console.log(data);

    setSelectedValue("");
    clearForm();
    closeForm();
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
          <TextField
            name="employerName"
            type="text"
            label="Employer Name"
            fullWidth
            variant="standard"
            onChange={(e) =>
              typeof e.target.value === "string" &&
              setEmployerName(e.target.value)
            }
          />
          <InputLabel style={{ marginTop: 20 }}>Discharge Details</InputLabel>
          <Box
            sx={{
              display: "flex",
              marginTop: "4px",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <InputLabel style={{ marginTop: 2, marginBottom: 2 }}>
                start Date
              </InputLabel>
              <TextField
                type="date"
                name="startDate"
                variant="standard"
                onChange={(e) =>
                  typeof e.target.value === "string" &&
                  setStartDate(e.target.value)
                }
              />
            </Box>
            <Box>
              <InputLabel style={{ marginTop: 2, marginBottom: 2 }}>
                End Date
              </InputLabel>
              <TextField
                type="date"
                name="endDate"
                variant="standard"
                onChange={(e) =>
                  typeof e.target.value === "string" &&
                  setEndDate(e.target.value)
                }
              />
            </Box>
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

export default OccupationalHealthcareForm;
