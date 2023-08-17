import { View, StyleSheet, Text, Pressable } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#24292e",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  // ...
});

const AppBarTab = ({ tabName }) => {
  const handlePress = () => {
    console.log("pressed");
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Text style={styles.text}>{tabName}</Text>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
