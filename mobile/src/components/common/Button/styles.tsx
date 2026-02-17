import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    width: "100%",
    paddingVertical: 12,
    // paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    borderRadius: theme.radius.l,
    alignItems: "center",
    justifyContent: "center",
    variants: {
      variant: {
        primary: {
          backgroundColor: theme.color.primary,
        },
        secondary: {
          backgroundColor: theme.color.backgroundLight,
        },
        tertiary: {
          backgroundColor: theme.color.error,
        },
        netural: {
          backgroundColor: theme.color.white,
          color: theme.color.background,
        },
      },
    },
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.s,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
}));
