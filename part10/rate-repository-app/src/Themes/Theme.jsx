import { Platform } from "react-native";
import androidTheme from "../Themes/Theme.android";
import iosTheme from "../Themes/Theme.ios";
import webTheme from "../Themes/Theme.web";

const Theme = Platform.select({
  ios: iosTheme,
  android: androidTheme,
  web: webTheme,
  default: webTheme,
});

export default Theme;
