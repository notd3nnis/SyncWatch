import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  TextStyle: (color) => ({
    letterSpacing: 0.5,
    color: color ? color : theme.color.light,
    variants: {
      tag: {
        h1: {
          fontSize: 32,
          lineHeight: 40,
        },
        h2: {
          fontSize: 24,
          lineHeight: 32,
        },
        subHeading: {
          fontSize: 20,
          lineHeight: 28,
        },
        body: {
          fontSize: 16,
          lineHeight: 24,
        },
        smallBody: {
          fontSize: 14,
          lineHeight: 21,
        },
        smallerBody: {
          fontSize: 12,
          lineHeight: 18,
        },
        caption: {
          fontSize: 10,
          lineHeight: 15,
        },
      },
      weight: {
        regular: { fontWeight: "400" },
        medium: { fontWeight: "500" },
        semibold: { fontWeight: "600" },
        bold: { fontWeight: "700" },
        extrabold: { fontWeight: "800" },
      } as const,
    },
  }),
}));
