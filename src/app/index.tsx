import { TamaguiProvider, Theme } from "tamagui";
import config from "@/tamagui.config";
import { StatusBar } from "expo-status-bar";
import { Typography } from "../constants/theme";

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <Theme name="dark">
        <StatusBar style="light" />
        <Typography variant="body" weight="regular"></Typography>
      </Theme>
    </TamaguiProvider>
  );
}
