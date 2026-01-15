import { TamaguiProvider } from "tamagui";
import { config } from "@/tamagui.config";
import { Typography } from "@/src/components/Typography";
import { useFonts } from "expo-font";

import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
  DMSans_800ExtraBold,
} from "@expo-google-fonts/dm-sans";

export default function App() {
  const [fontsLoaded] = useFonts({
    "DM-Sans": DMSans_400Regular,
    "DM-Sans-Medium": DMSans_500Medium,
    "DM-Sans-SemiBold": DMSans_600SemiBold,
    "DM-Sans-Bold": DMSans_700Bold,
    "DM-Sans-ExtraBold": DMSans_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null; // or a loading screen
  }
  return (
    <TamaguiProvider config={config} defaultTheme="dark">
      <Typography variant="body" weight="medium" color="$color.purplePrimary">
        Start a watch party and stay in cinematic sync with friends and family.
      </Typography>
    </TamaguiProvider>
  );
}
