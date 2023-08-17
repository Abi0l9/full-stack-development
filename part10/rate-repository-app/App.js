// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
import { View } from "react-native";
import Main from "./src/components/Main";
import RepositoryList from "./src/components/RepositoryList";

export default function App() {
  return (
    <View>
      <Main />
      <RepositoryList />
    </View>
  
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
