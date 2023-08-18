import { View, StyleSheet, Text, Pressable } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  // ...
});

const AppBarTab = ({ tabName, link }) => {
  const handlePress = () => {
    console.log("pressed");
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Link to={link}>
          <Text style={styles.text}>{tabName}</Text>
        </Link>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
