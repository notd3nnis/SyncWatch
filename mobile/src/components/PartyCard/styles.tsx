import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    maxHeight: 120,
    overflow: "hidden",
  },
  containerPressed: {
    opacity: 0.8,
  },
  content: {
    flexDirection: "row",
  },
  posterContainer: {
    width: 200,
    height: 120,
    position: "relative",
  },
  poster: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  statusBadge: {
    position: "absolute",
    top: theme.spacing.s,
    left: theme.spacing.s,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
    borderRadius: 6,
  },
  movieTitleOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.s,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  movieTitle: {
    textTransform: "uppercase",
    fontSize: 14,
  },
  infoContainer: {
    flex: 1,
    padding: theme.spacing.m,
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  participants: {
    flexDirection: "row",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.color.backgroundLight,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  remainingAvatar: {
    backgroundColor: theme.color.white,
  },
}));
