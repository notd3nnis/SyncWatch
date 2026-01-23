import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  TextStyle: (color, align) => ({
    fontFamily: "DM-Sans",
    letterSpacing: -0.5,
    color: color ? color : theme.color.white,
    textAlign: align ? align : "left",
    variants: {
      variant: {
        h1: {
          fontSize: theme.fontsize.xxl,
          lineHeight: 40,
        },
        h2: {
          fontSize: theme.fontsize.xl,
          lineHeight: 32,
        },
        subHeading: {
          fontSize: theme.fontsize.l,
          lineHeight: 28,
        },
        body: {
          fontSize: theme.fontsize.m,
          lineHeight: 24,
        },
        smallBody: {
          fontSize: theme.fontsize.xm,
          lineHeight: 21,
        },
        smallerBody: {
          fontSize: theme.fontsize.s,
          lineHeight: 18,
        },
        caption: {
          fontSize: theme.fontsize.xs,
          lineHeight: 15,
        },
      },
      weight: {
        regular: { fontFamily: "DMSans-Regular" },
        medium: { fontFamily: "DMSans-Medium" },
        semibold: { fontFamily: "DMSans-SemiBold" },
        bold: { fontFamily: "DMSans-Bold" },
        extrabold: { fontFamily: "DMSans-ExtraBold" },
      } as const,
    },
  }),
}));
