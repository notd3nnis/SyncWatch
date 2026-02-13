import { StyleSheet } from "react-native-unistyles";
import { Dimensions } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create((theme) => ({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
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
}));
