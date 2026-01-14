import { TamaguiProvider, View, Button } from "tamagui";
import tamaguiConfig from "../../tamagui.config"; // Your config

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <View>
        <Button size="20">
          Testing the new button 
        </Button>
      </View>
    </TamaguiProvider>
  )
}
