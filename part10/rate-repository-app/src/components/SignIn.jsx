import { Pressable, StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  input: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderColor: "darkgray",
    borderWidth: 1,
    marginBottom: 8,
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

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="username"
            placeholder="Username"
            type="text"
            style={styles.input}
          />
          <FormikTextInput
            name="password"
            placeholder="Password"
            type="password"
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
