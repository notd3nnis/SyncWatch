import { createTamagui } from "tamagui";
import { defaultConfig } from "@tamagui/config/v4";

import { tokens, DmSans } from "@/src/constants/theme";

const config = createTamagui({
  ...defaultConfig, // This was the critical missing piece
  tokens: {
    ...defaultConfig.tokens,
    size: tokens.size,
    space: tokens.space,
    radius: tokens.radius,
    color: tokens.color,
    zIndex: tokens.zIndex,
  },
  fonts: {
    ...defaultConfig.fonts,
    body: DmSans,
    heading: DmSans,
  },
});

type OurConfig = typeof config;

declare module "tamagui" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends OurConfig {}
}

export { config };
