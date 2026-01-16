export const palette = {
  pink01: "#FF007B",
  purple01: "#7130F0",
  black: "#000000",
  white:'#ffff',

};

export const darkTheme = {
  color: {
    background: palette.black,
    primary: palette.pink01,
    secondary:palette.purple01
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  radius: {
    xs:2,
    s: 4,
    m: 8,
    l: 12,
    xl: 16,
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
