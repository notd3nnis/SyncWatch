export const palette = {
  pink01: "#FF007B",
  purple01: "#7130F0",
  red: "EF5350",
  black: "#0A0A0A",

  white01: "#FFFFFF",
  white02: "#E5E5E5",

  gray01: "#171717",
  gray02: "#737373",
  gray03: "#262626",
  gray04: "#A3A3A3",
};

export const darkTheme = {
  color: {
    background: palette.black,
    backgroundLight: palette.gray01,
    primary: palette.pink01,
    secondary: palette.purple01,
    white: palette.white01,
    whiteLight: palette.white02,
    textMuted: palette.gray04,
    error: palette.red,

    gray02: palette.gray02,
    gray03: palette.gray03,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 48,
    xxl: 96,
  },
  radius: {
    xs: 2,
    s: 4,
    m: 8,
    l: 12,
    xl: 16,
  },
  fontsize: {
    xs: 10,
    s: 12,
    xm: 14,
    m: 16,
    l: 20,
    xl: 24,
    xxl: 32,
  },
} as const;

export const breakpoints = {
  xs: 0,
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
  superLarge: 2000,
  tvLike: 4000,
} as const;
