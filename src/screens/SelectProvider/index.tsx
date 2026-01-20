import { useState } from "react";
import { styles } from "./styles";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Logo } from "@/src/assets/svgs";
import Button from "@/src/components/Button";
import Typography from "@/src/components/Typography";
import { selectProviderData } from "@/src/utils/dummyDatas";



const SelectProvider = () => {
const [selectedId, setSelectedId] = useState<number | null>(null);

return (
  <SafeAreaView style={styles.container}>
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.logoWrapper}>
          <Logo />
        </View>
        <Typography variant="subHeading" weight="medium">
          syncwatch
        </Typography>
      </View>
      <View style={styles.typographyContainer}>
        <Typography variant="h2" weight="bold">
          Select a streaming service.
        </Typography>
        <Typography variant="body" weight="medium">
          We’ll open it in sync for everyone.
        </Typography>
      </View>
      <View style={styles.streamServicesContainer}>
        {selectProviderData.map((item) => {
          return (
            <Pressable
              key={item.id}
              style={styles.provider}
              onPress={() => {
                setSelectedId(item.id);
              }}
            >
              <View style={styles.logoFrame}>
                <View style={styles.logo}>{item.logo}</View>
                <Typography variant="body" weight="medium">
                  {item.title}
                </Typography>
              </View>
              <View
                style={[
                  styles.dot,
                  selectedId === item.id && styles.dotActive,
                ]}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
    <Button disabled={selectedId === null} title="selectProvider">
      Continue to homepage
    </Button>
  </SafeAreaView>
);
};
export default SelectProvider;