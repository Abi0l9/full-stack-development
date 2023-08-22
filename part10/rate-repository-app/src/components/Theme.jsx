import { Platform } from "react-native";

const Theme = Platform.select({
  ios: () => require("./Theme.ios"),
  android: () => require("./Theme.android"),
  web: () => require("./Theme.web"),
})();

export default Theme;
