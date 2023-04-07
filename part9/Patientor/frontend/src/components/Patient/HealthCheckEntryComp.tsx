import { HealthCheckEntry } from "../../types";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { MedicalServices } from "@mui/icons-material";

type Props = {
  entry: HealthCheckEntry;
};

function HealthCheckEntryComp({ entry }: Props) {
  return (
    <Box key={entry.id} sx={{ border: 1, borderRadius: 2, marginBottom: '5px', padding: 1 }}>
      <Typography component="p">
        {entry.date} <MedicalServices /> <br /> {entry.description} <br />{" "}
        diagnose by {entry.specialist}
      </Typography>
    </Box>
  );
}

export default HealthCheckEntryComp;
