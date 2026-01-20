import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
  DMSans_800ExtraBold,
} from "@expo-google-fonts/dm-sans";
import { SafeAreaProvider } from "react-native-safe-area-context";

import SelectProvider from "../screens/SelectProvider";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [loaded, error] = useFonts({
    "DM-Sans": DMSans_400Regular,
    "DM-Sans-Medium": DMSans_500Medium,
    "DM-Sans-SemiBold": DMSans_600SemiBold,
    "DM-Sans-Bold": DMSans_700Bold,
    "DM-Sans-ExtraBold": DMSans_800ExtraBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SelectProvider />
    </SafeAreaProvider>
  );
}
