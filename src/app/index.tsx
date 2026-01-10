import { TamaguiProvider, View, Text, Button } from "tamagui";
import tamaguiConfig from "../../tamagui.config"; // Your config

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <View>
        <Button size="50">
          Testing
        </Button>
      </View>
    </TamaguiProvider>
  );
}
