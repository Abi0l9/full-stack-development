import React from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Box,
} from "@mui/material";
import { healthCheckRatingOptions, AddEntryFormProps } from "./entryTypes";
import { HealthCheckEntry } from "../../types";
import patientServices from "./../../services/patients";

const HealthCheckForm = ({
  id,
  setSelectedValue,
  setOpenForm,
}: AddEntryFormProps) => {
  const [date, setDate] = React.useState("");
  const [specialist, setSpecialist] = React.useState("");
  const [healthCheckRating, setHealthCheckRating] = React.useState(0);
  const [description, setDescription] = React.useState("");
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

    const data: HealthCheckEntry = {
      id,
      date,
      specialist,
      type: "HealthCheck",
      description,
      healthCheckRating,
      diagnosisCodes: diagnosisCodes.split(","),
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
          <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
          <Select
            label="healthCheckRating"
            fullWidth
            name="healthCheckRating"
            value={healthCheckRating}
            onChange={(e) =>
              typeof e.target.value === "number" &&
              setHealthCheckRating(e.target.value)
            }
          >
            {healthCheckRatingOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
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

export default HealthCheckForm;
