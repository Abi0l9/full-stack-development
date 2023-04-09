import React from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Box,
} from "@mui/material";
import { healthCheckRatingOptions } from "./entryTypes";

type Props = {
  id: string;
};

const HealthCheckForm = ({ id }: Props) => {
  const [date, setDate] = React.useState("");
  const [specialist, setSpecialist] = React.useState("");
  const [healthCheckRating, setHealthCheckRating] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [diagnosisCodes, setDiagnosisCodes] = React.useState("");

  const clearForm = () => {
    (document.getElementById("form") as HTMLFormElement).reset();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      date,
      specialist,
      type: "Health",
      healthCheckRating,
      description,
      diagnosisCodes,
    });
    clearForm();
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
            <Button color="secondary" variant="contained" type="button">
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
