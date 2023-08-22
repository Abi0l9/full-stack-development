import { Text, StyleSheet, View } from "react-native";
import { useField } from "formik";
import TextInput from "./TextInput";

const styles = StyleSheet.create({
  errorText: {
    color: "#d73a4a",
    fontWeight: "bold",
  },
  inputWrapper: {
    marginTop: 2,
    marginBottom: 10,
  },
  input: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderColor: "darkgray",
    borderWidth: 1,
    marginBottom: 8,
  },
  errorInput: {
    borderWidth: 1,
    borderColor: "#d73a4a",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  const inputStyles = [styles.input, showError && styles.errorInput];

  return (
    <View>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        secureTextEntry={false}
        {...props}
        style={inputStyles}
      />
      <View style={styles.inputWrapper}>
        {showError && <Text style={styles.errorText}>{meta.error}</Text>}
      </View>
    </View>
  );
};

export default FormikTextInput;
