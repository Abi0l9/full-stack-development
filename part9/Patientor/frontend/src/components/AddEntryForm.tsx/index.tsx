import HealthCheckForm from "./HealthCheckForm";
import { AddEntryFormProps } from "./entryTypes";
import HospitalForm from "./HospitalForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";

function AddEntryForm({
  id,
  setSelectedValue,
  selectedValue,
  setOpenForm,
}: AddEntryFormProps) {
  switch (selectedValue) {
    case "Hospital":
      return (
        <HospitalForm
          id={id}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          setOpenForm={setOpenForm}
        />
      );
    case "HealthCheck":
      return (
        <HealthCheckForm
          id={id}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          setOpenForm={setOpenForm}
        />
      );
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareForm
          id={id}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          setOpenForm={setOpenForm}
        />
      );
    default:
      return <div></div>;
  }
}

export default AddEntryForm;
