import Constants from "expo-constants";
import { /*Text,*/ StyleSheet, View } from "react-native";
import AppBar from "./AppBar";
import RepositoryList from "../components/RepositoryList";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

export default Main;
