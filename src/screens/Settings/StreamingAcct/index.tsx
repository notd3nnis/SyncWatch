import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUnistyles } from "react-native-unistyles";
import { View, Pressable, ScrollView } from "react-native";

import { styles } from "./styles";
import StackHeader from "@/src/components/StackHeader";
import Typography from "@/src/components/common/Typography";
import { NetflixLogo, PlusIcon, PrimeLogo } from "@/src/assets/svgs";

interface StreamingPlatform {
  id: number;
  name: string;
  logo: React.ReactNode;
  isActive: boolean;
}

const platforms: StreamingPlatform[] = [
  { id: 1, name: "Netflix", logo: <NetflixLogo />, isActive: true },
  { id: 2, name: "Prime Video", logo: <PrimeLogo />, isActive: false },
];

export default function StreamingAccountsScreen() {
  const router = useRouter();
  const { theme } = useUnistyles();

  const handleBack = () => {
    router.back();
  };

  const handleAddPlatform = () => {
    console.log("Add new platform");
  };

  const handlePlatformPress = (platform: StreamingPlatform) => {
    console.log(`Pressed: ${platform.name}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StackHeader handleBack={() => handleBack()} title="Streaming Accounts" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.descriptionContainer}>
          <Typography variant="smallBody" weight="medium">
            See all your connected streaming platforms.
          </Typography>
        </View>

        <View style={styles.platformsList}>
          {platforms.map((platform) => (
            <Pressable
              key={platform.id}
              style={styles.platformItem}
              onPress={() => handlePlatformPress(platform)}
            >
              <View style={styles.platformLeft}>
                <View>{platform.logo}</View>
                <Typography variant="body" weight="medium">
                  {platform.name}
                </Typography>
              </View>

              {platform.isActive && (
                <View style={styles.activeBadge}>
                  <Typography
                    variant="caption"
                    weight="medium"
                    color={theme.color.white}
                  >
                    Active
                  </Typography>
                </View>
              )}
            </Pressable>
          ))}

          <Pressable style={styles.addButton} onPress={handleAddPlatform}>
            <PlusIcon width={15} height={13} color={theme.color.white} />
            <Typography variant="body" weight="medium">
              New streaming platform
            </Typography>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
