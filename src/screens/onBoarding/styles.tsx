import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  bottomSection: {
    paddingHorizontal: theme.spacing.l,
    marginBottom: theme.spacing.l,
    gap: theme.spacing.l,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.s,
  },
  dot: {
    width: 8,
    height: 10,
    borderRadius: theme.radius.s,
    backgroundColor: theme.color.backgroundLight,
  },
  dotActive: {
    width: 40,
    backgroundColor: theme.color.white,
    borderRadius: theme.radius.l,
  },
  buttonGroup: {
    gap: theme.spacing.m,
  },
}));
