import { useFonts } from "expo-font";
import '@/src/constants/unistyles.config'
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
  DMSans_800ExtraBold,
} from "@expo-google-fonts/dm-sans";
import Typography from "../components/Typography/index";

export default function RootLayout () {
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
  return <Typography tag="h1">This is my hew button </Typography>;
}
