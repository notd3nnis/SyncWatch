import { StyleSheet } from "react-native-unistyles";
import { darkTheme, breakpoints } from "./theme";

const appThemes = {
  dark: darkTheme,
};

type AppThemes = typeof appThemes;
type AppBreakpoints = typeof breakpoints;

declare module "react-native-unistyles" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    initialTheme: "dark",
  },
  breakpoints,
  themes: appThemes,
});
