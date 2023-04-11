import React from "react";
import { TextField, InputLabel, Button, Box, Typography, Select, MenuItem } from "@mui/material";
import { AddEntryFormProps } from "./entryTypes";
import { OccupationalHealthcareEntry } from "../../types";
import patientServices from "./../../services/patients";
import { diagnosisList } from "./../../utils";


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

    const data: OccupationalHealthcareEntry = {
      id,
      date,
      specialist,
      type: "OccupationalHealthcare",
      description,
      employerName,
      diagnosisCodes: Array(diagnosisCode),
      sickLeave: { startDate, endDate },
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
        <Typography variant="h6">New Occupational Entry</Typography>
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
            required
          />
          <InputLabel style={{ marginTop: 20 }}>Sick Leave</InputLabel>
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
