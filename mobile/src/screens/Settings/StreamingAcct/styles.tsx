import { StyleSheet } from "react-native-unistyles";


export const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
    paddingHorizontal: theme.spacing.m,
  },
  descriptionContainer: {
    paddingVertical: theme.spacing.m,
  },
  platformsList: {
    gap: theme.spacing.l,
  },
  platformItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.color.backgroundLight,
    borderRadius: theme.radius.l,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
  },
  platformLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.s,
  },
  activeBadge: {
    backgroundColor: theme.color.active,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.s,
    borderRadius: theme.radius.s,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.color.backgroundLight,
    borderRadius: theme.radius.l,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    gap: theme.spacing.m,
    marginTop: theme.spacing.s,
    width: "70%",
  },
}));