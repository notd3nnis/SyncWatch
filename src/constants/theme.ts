import { createTokens, createFont } from "tamagui";

// Font
const DmSans = createFont({
  family: "DM-Sans",
  size: {
    h1: 32,
    h2: 24,
    subHeading: 20,
    body: 16,
    smallBody: 14,
    smallerBody: 12,
    caption: 10,
  },
});
// TOKENS
const tokens = createTokens({
  color: {
    pinkPrimary: "#FF007B",
    purplePrimary: "#7130F0",
    yellowPrimary: "#FEC500",

    black: "#000000",
    white: "#FFFFFF",
  },
  space: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    true: 8,
  },
  size: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    true: 8,
  },
  radius: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    true: 0,
  },
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    true: 0,
  },
});

export { tokens, DmSans };
