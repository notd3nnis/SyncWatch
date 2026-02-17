import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  wrapper: {},
  label: {
    color: theme.color.white,
    marginBottom: theme.spacing.s,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.color.background,
    borderRadius: theme.radius.m,
    paddingHorizontal: theme.spacing.m,
    height: 48,
    variants: {
      variant: {
        secondary: {
          backgroundColor: theme.color.gray03,
        },
      },
    },
  },

  containerFocused: {},
  containerError: {
    borderColor: theme.color.error,
  },
  iconLeft: {
    marginRight: theme.spacing.s,
  },
  iconRight: {
    marginLeft: theme.spacing.s,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: theme.color.white,
  },
  error: {
    color: theme.color.error,
    marginTop: theme.spacing.xs,
  },
}));
