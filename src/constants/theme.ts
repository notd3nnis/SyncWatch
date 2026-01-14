import { createTokens, styled, SizableText } from "tamagui";

// PALETTE
const palette = {
  pinkPrimary: "#FF007B",
  purplePrimary: "#7130F0",
  yellowPrimary: "#FEC500",

  black: "#000000",
  white: "#FFFFFF",
};

// TOKENS
const tokens = createTokens({
  color: palette,
  space: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  size: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  radius: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
  },
});

// THEME
const darkTheme = {
  background: palette.black,
  primary: palette.pinkPrimary,
  secondary: palette.purplePrimary,
  accent: palette.yellowPrimary,
};

// TYPOGRAPHY COMPONENTS
export const Typography = styled(SizableText, {
  color: "$color",
  variants: {
    variant: {
      h1: {
        fontSize: 28,
        lineHeight: 34,
      },
      h2: {
        fontSize: 20,
        lineHeight: 25,
      },
      subheading: {
        fontSize: 17,
        lineHeight: 22,
      },
      body: {
        fontSize: 15,
        lineHeight: 20,
      },
      small: {
        fontSize: 13,
        lineHeight: 18,
      },
      smaller: {
        fontSize: 12,
        lineHeight: 16,
      },
      caption: {
        fontSize: 11,
        lineHeight: 13,
      },
    },

    weight: {
      regular: { fontWeight: "400" },
      medium: { fontWeight: "500" },
      semibold: { fontWeight: "600" },
      bold: { fontWeight: "700" },
      extrabold: { fontWeight: "800" },
    },
  } as const,

  defaultVariants: {
    variant: "body",
    weight: "regular",
  },
});

export { palette, tokens, darkTheme };
