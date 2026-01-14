import { createTamagui } from "tamagui";
import { tokens, darkTheme } from "@/src/constants/theme";

const config = createTamagui({
  tokens,
  themes: {
    dark: darkTheme,
  },
});

type Conf = typeof config;

declare module "tamagui" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends Conf {}
}

export default config;
