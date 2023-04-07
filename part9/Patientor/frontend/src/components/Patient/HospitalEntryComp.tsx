import { MedicalServices } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { HospitalEntry } from "../../types";

type Props = {
  entry: HospitalEntry;
};
const HospitalEntryComp = ({ entry }: Props) => {
  return (
    <Box
      key={entry.id}
      sx={{ border: 1, borderRadius: 2, marginBottom: "5px", padding: 1 }}
    >
      <Typography component="p">
        {entry.date} <MedicalServices /> <br /> {entry.description} <br />{" "}
        diagnose by {entry.specialist}
      </Typography>
    </Box>
  );
};

export default HospitalEntryComp;
