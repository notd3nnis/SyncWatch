import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    // gap: theme.spacing.m,
  },
  label: {
    color: theme.color.white,
    marginBottom: theme.spacing.xs,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.color.gray03,
    borderRadius: theme.radius.m,
    paddingHorizontal: theme.spacing.m,
    height: 48,
  },
  containerFocused: {
    // borderColor: '#E5E5E5',
    // backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
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
