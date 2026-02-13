import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: theme.radius.l,
    backgroundColor: theme.color.background,
  },
  label: {
    paddingVertical: theme.spacing.s,
  },

  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.color.white,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.m,
    gap: theme.spacing.xs,
  },
  copyButtonPressed: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  clipboardIcon: {
    width: 14,
    height: 14,
    position: "relative",
  },
  clipboardBack: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 12,
    backgroundColor: theme.color.background,
    borderRadius: theme.radius.xs,
    borderWidth: theme.radius.xs,
  },
  clipboardFront: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 10,
    height: 12,
    backgroundColor: theme.color.white,
    borderRadius: theme.radius.xs,
    borderWidth: theme.radius.xs,
  },
}));
