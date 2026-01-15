import { styled, SizableText } from "tamagui";

export const Typography = styled(SizableText, {
  letterSpacing: -0.5,
  fontFamily: "$body",
  variants: {
    variant: {
      h1: {
        fontSize: "$h1",
        lineHeight: 40,
      },
      h2: {
        fontSize: "$h2",
        lineHeight: 32,
      },
      subHeading: {
        fontSize: "$subHeading",
        lineHeight: 28,
      },
      body: {
        fontSize: "$body",
        lineHeight: 24,
      },
      smallBody: {
        fontSize: "$smallBody",
        lineHeight: 21,
      },
      smallerBody: {
        fontSize: "$smallerBody",
        lineHeight: 18,
      },
      caption: {
        fontSize: "$caption",
        lineHeight: 15,
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
