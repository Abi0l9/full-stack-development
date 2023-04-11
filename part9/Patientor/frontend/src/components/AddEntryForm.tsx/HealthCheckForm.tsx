import React from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { healthCheckRatingOptions, AddEntryFormProps } from "./entryTypes";
import { HealthCheckEntry } from "../../types";
import patientServices from "./../../services/patients";
import { diagnosisList } from "./../../utils";

const HealthCheckForm = ({
  id,
  setSelectedValue,
  setOpenForm,
}: AddEntryFormProps) => {
  const [date, setDate] = React.useState("");
  const [specialist, setSpecialist] = React.useState("");
  const [healthCheckRating, setHealthCheckRating] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [diagnosisCode, setDiagnosisCode] = React.useState("");
  const [diagnosisLists, setDiagnosisLists] = React.useState<string[]>([]);

  React.useEffect(() => {
    const getCodes = async () => {
      const request = await diagnosisList();
      setDiagnosisLists(request);
    };

    void getCodes();
  });

  const clearForm = () => {
    (document.getElementById("form") as HTMLFormElement).reset();
  };

  const closeForm = () => {
    setOpenForm(false);
    setSelectedValue("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: HealthCheckEntry = {
      id,
      date,
      specialist,
      type: "HealthCheck",
      description,
      healthCheckRating,
      diagnosisCodes: Array(diagnosisCode),
    };

    try {
      await patientServices.addEntry(id, data);
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
        <Typography variant="h6">New Health Check Entry</Typography>

        <form onSubmit={handleSubmit} id="form">
          <TextField
            type="date"
            fullWidth
            name="date"
            variant="standard"
            onChange={(e) =>
              typeof e.target.value === "string" && setDate(e.target.value)
            }
            required
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
            required
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
            required
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
            required
          />
          <InputLabel style={{ marginTop: 20 }}>Diagnosis Code</InputLabel>
          <Select
            label="Diagnosis Code"
            fullWidth
            name="diagnosisCode"
            value={diagnosisCode}
            placeholder="Select diagnosis code"
            onChange={(e) =>
              typeof e.target.value === "string" &&
              setDiagnosisCode(e.target.value)
            }
          >
            {diagnosisLists.map((diagCode) => (
              <MenuItem key={diagCode} value={diagCode}>
                {diagCode}
              </MenuItem>
            ))}
          </Select>
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
