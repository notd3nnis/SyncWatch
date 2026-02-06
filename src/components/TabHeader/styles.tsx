import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: theme.spacing.m,
  },
  notificationContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: theme.color.gray03,
    borderRadius: "50%",
  },
}));
