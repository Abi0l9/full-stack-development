import { MedicalServices } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../types";

type Props = {
  entry: OccupationalHealthcareEntry;
};

function OccupationalHealthcareEntryComp({ entry }: Props) {
  return (
    <Box key={entry.id} sx={{ border: 1, borderRadius: 2, padding: 1, marginBottom: '5px' }}>
      <Typography component="p">
        {entry.date} <MedicalServices /> <br /> {entry.description} <br />{" "}
        diagnose by {entry.specialist}
      </Typography>
    </Box>
  );
}

export default OccupationalHealthcareEntryComp;
