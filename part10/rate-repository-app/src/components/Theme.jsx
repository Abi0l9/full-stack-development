import { Platform } from "react-native";
import androidTheme from "./Theme.android";
import iosTheme from "./Theme.ios";
import webTheme from "./Theme.web";

const Theme = Platform.select({
  ios: iosTheme,
  android: androidTheme,
  web: webTheme,
  default: webTheme,
});

export default Theme;
