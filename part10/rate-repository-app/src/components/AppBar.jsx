import { View, StyleSheet } from "react-native";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },

  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab tabName={"Repositories"} />
    </View>
  );
};

export default AppBar;
