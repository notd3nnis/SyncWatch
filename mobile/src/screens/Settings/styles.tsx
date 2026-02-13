import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
    // paddingHorizontal: theme.spacing.m,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: theme.spacing.xl,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: theme.color.primary,
    padding: 4,
    marginBottom: theme.spacing.m,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 46,
  },

  section: {
    marginBottom: theme.spacing.l,
  },
  sectionTitle: {
    marginBottom: theme.spacing.s,
  },
  menuGroup: {},
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    borderRadius: theme.radius.m,
    backgroundColor: theme.color.backgroundLight,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.m,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 16,
    backgroundColor: theme.color.background,
    marginLeft: theme.spacing.m + 32 + theme.spacing.m,
  },
}));
