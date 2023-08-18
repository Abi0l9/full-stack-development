// import { Text, View } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";

const initialValues = { username: "", password: "" };

const SignIn = () => {
  const onSubmit = () => {
    console.log("submitted");
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <FormikTextInput name="username" />}
    </Formik>
  );
};

export default SignIn;
