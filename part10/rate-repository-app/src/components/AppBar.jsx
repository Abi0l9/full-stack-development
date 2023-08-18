import { View, StyleSheet } from "react-native";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#24292e",
  },

  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab tabName={"Repositories"} link={"/"} />
      <AppBarTab tabName={"Sign in"} link={"sign-in"} />
    </View>
  );
};

export default AppBar;
