import { StyleSheet } from "react-native-unistyles";
import { Dimensions } from "react-native";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
    paddingHorizontal: theme.spacing.s,
    paddingBottom: rt.insets.bottom,
  },
  header: {
    paddingVertical: theme.spacing.m,
  },
  tabContainer: {
    paddingBottom: theme.spacing.l,
  },
  listContent: {
    gap: theme.spacing.l,
  },
  emptyContainer: {
    alignItems: "center",
  },
  stickyButtonContainer: {
    position: "absolute",
    right: 20,
    bottom: 100,
  },
  joinButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.s,
    borderRadius: theme.radius.l,
    shadowColor: theme.color.primary,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.color.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  joinButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  joinPartySection: {
    gap: 20,
  },
  ButtonWrapper: {
    marginBottom: 20,
  },
}));
