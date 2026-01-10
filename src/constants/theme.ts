import { Platform } from "react-native";

export const Colors = {
  neutral: {
    neutral01: "#0A0A0A",
    netural02: "#262626",
    netural03: "#262626",
    netural04: "#404040",
    netural05: "#A3A3A3",
    netural06: "#D4D4D4",
    netural07: "#E5E5E5",
    netural08: "#E5E5E5",
    netural09: "#F5F5F5",
    netural10: "#FAFAFA",
  },
  green: {
    green01: "#026B3F",
    green02: "#00A14B",
    green03: "#00C059",
    green04: "#70E2A0",
    green05: "#D3F6E4",
  },
  red: {
    red01: "#8C1C13",
    red02: "#D83037",
    red03: "#FF3B30",
    red04: "#E63946",
    red05: "#F8D7DA",
  },
  yellow: {
    yellow01: "#946F00",
    yellow02: "#E6A800",
    yellow03: "#FFBE00",
    yellow04: "#FFD966",
    yellow05: "#FFF4CC",
  },
};

export const Typography = {
  fontSizes: {
    extraBold: "32px",
    bold: "24px",
    medium: "20px",
    regular: "16px",
  },
  fontweight: {
    extrabold: "800",
    bold: "700",
    semiBold: "600",
    medium: "500",
    regular: "400",
  },
  lineHeights: {
    extraBold: "40px",
    bold: "32px",
    medium: "28px",
    regular: "24px",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
});
