import { View, StyleSheet, ScrollView } from "react-native";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#24292e",
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab tabName={"Repositories"} link={"/"} />
        <AppBarTab tabName={"Sign in"} link={"sign-in"} />
      </ScrollView>
    </View>
  );
};

export default AppBar;
