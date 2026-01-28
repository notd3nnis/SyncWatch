import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    backgroundColor: theme.color.backgroundLight,
    borderRadius: theme.radius.m,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.m,
  },
  tabSelected: {
    backgroundColor: theme.color.background,
  },
  tabFirst: {},
  tabLast: {},
  tabPressed: {
    opacity: 0.7,
  },
}));
