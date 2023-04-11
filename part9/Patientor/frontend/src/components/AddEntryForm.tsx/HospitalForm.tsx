import React from "react";
import {
  TextField,
  InputLabel,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { AddEntryFormProps } from "./entryTypes";
import { HospitalEntry } from "../../types";
import patientServices from "./../../services/patients";
import { diagnosisList } from "./../../utils";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: HospitalEntry = {
      id,
      date,
      specialist,
      type: "Hospital",
      description,
      diagnosisCodes: Array(diagnosisCode),
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
        <Typography variant="h6">New Hospital Entry</Typography>

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
              required
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
              required
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
