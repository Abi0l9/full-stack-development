import { Pressable, StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  buttonWrapper: {
    backgroundColor: "#0366d6",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 10,
    width: "100%",
  },
  button: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

const initialValues = { username: "", password: "" };

const validationSchema = yup.object().shape({
  username: yup.string().min(3).required("Username is required"),
  password: yup
    .string()
    .min(6, "Minimum length is 6")
    .required("Password is required"),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="username"
            placeholder="Username"
            style={styles.input}
          />
          <FormikTextInput
            name="password"
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
          />
          <Pressable
            type="submit"
            style={styles.buttonWrapper}
            onPress={handleSubmit}
          >
            <Text style={styles.button}>Sign In</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
