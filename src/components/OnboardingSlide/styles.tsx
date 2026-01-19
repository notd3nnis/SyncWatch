import { StyleSheet } from "react-native-unistyles";
import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  slideContainer: {
    width: SCREEN_WIDTH,
    flex: 1,
    padding: theme.spacing.l,
  },
  imageSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageFrame: {
    backgroundColor: theme.color.backgroundLight,
    width: 342,
    height: 342,
    borderRadius: theme.radius.xl,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: theme.spacing.l,
  },
  textSection: {
    gap: theme.spacing.s,
    paddingHorizontal: theme.spacing.xs,
  },
}));
