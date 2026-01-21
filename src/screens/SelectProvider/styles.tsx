import { StyleSheet } from "react-native-unistyles";
import { Dimensions } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.m,
    paddingBottom: rt.insets.bottom,
  },
  headerContainer: {
    marginTop: theme.spacing.l,
    flexDirection: "row",
    alignItems: "center",
  },
  logoWrapper: {
    marginTop: theme.spacing.xs,
    marginRight: theme.spacing.s,
  },
  typographyContainer: {
    paddingTop: theme.spacing.l,
    paddingBottom: theme.spacing.l,
    gap: theme.spacing.s,
  },
  streamServicesContainer: {
    paddingVertical: theme.spacing.l,
    flexDirection: "column",
    gap: theme.spacing.l,
  },
  provider: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.color.backgroundLight,
    height: SCREEN_HEIGHT * 0.08,
    padding: theme.spacing.m,
    borderRadius: theme.radius.l,
  },
  logoFrame: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    marginRight: theme.spacing.s,
  },
  dot: {
    width: 18,
    height: 18,
    borderWidth: theme.radius.xs,
    borderColor: theme.color.gray02,
    borderRadius: 50,
  },
  dotActive: {
    backgroundColor: theme.color.white,
    borderColor: theme.color.white,
  },
}));
