import { StyleSheet } from "react-native-unistyles";
import { Dimensions } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create((theme) => ({
  modalContainer: {
    paddingTop: 64,
    maxHeight: SCREEN_HEIGHT * 0.8,
    paddingBottom: theme.spacing.l,
    paddingHorizontal: theme.spacing.m,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    backgroundColor: theme.color.backgroundLight,
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing.m,
    right: theme.spacing.m,
  },
  closeIconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.xl,
    width: 32,
    height: 32,
  },

  // details
  posterContainer: {
    width: "100%",
    height: 192,
    overflow: "hidden",
    borderRadius: theme.radius.m,
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  content: {
    gap: theme.spacing.l,
  },

  rankBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.s,
    paddingTop: theme.spacing.m,
  },
  rank: {
    alignItems: "center",
    backgroundColor: theme.color.abstract,
    borderRadius: theme.radius.xs,
    paddingHorizontal: theme.spacing.xs,
  },
  buttonContainer: {
    marginBottom: theme.spacing.m,
  },

  // form
  description: {
    flexDirection: "row",
    gap: 12,
    paddingBottom: theme.spacing.s,
  },
  banner: {
    width: 78,
    height: 44,
    borderRadius: theme.radius.xs,
  },
  bannerImg: {
    width: "100%",
    height: "100%",
  },

  formContainer: {
    gap: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },

  // success
  createdPartysection: {
    gap: 12,
    marginBottom: 20,
  },
  bannerCard: {
    height: 80,
    borderRadius: theme.radius.l,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.color.background,
  },
  bannerLeft: {
    position: "absolute",
    right: 1,
    bottom: 1,
  },
  bannerRight: {
    position: "absolute",
    left: 1,
    bottom: 1,
  },
}));
