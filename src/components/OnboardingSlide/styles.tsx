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
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageFrame: (index) => ({
    backgroundColor: theme.color.backgroundLight,
    width: 360,
    height: 342,
    borderRadius: theme.radius.xl,
    justifyContent: index === 1 ? "flex-start" : "flex-end",
    alignItems: "center",
    paddingHorizontal: theme.spacing.l,
  }),
  textSection: {
    gap: theme.spacing.s,
    paddingHorizontal: theme.spacing.xs,
  },
}));
