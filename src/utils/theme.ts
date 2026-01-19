export const palette = {
  pink01: "#FF007B",
  purple01: "#7130F0",
  black: "#0A0A0A",
  white: "#FFFFFF",
  gray01: "#171717",
  gray02: "#737373",
};

export const darkTheme = {
  color: {
    background: palette.black,
    backgroundLight: palette.gray01,
    primary: palette.pink01,
    secondary: palette.purple01,
    white: palette.white,
    gray02: palette.gray02,
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
