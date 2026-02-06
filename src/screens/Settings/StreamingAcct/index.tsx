import React from "react";
import { View, Pressable, ScrollView } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Typography from "@/src/components/common/Typography";
import { BackIcon } from "@/src/assets/svgs";
// import { BackIcon, PlusIcon } from "@/src/assets/svgs";

interface StreamingPlatform {
  id: number;
  name: string;
  logo: string;
  isActive: boolean;
}

const platforms: StreamingPlatform[] = [
  { id: 1, name: "Netflix", logo: "N", isActive: true },
  { id: 2, name: "Prime Video", logo: "prime", isActive: false },
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
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <BackIcon width={15} height={13} color={theme.color.white} />
        </Pressable>
        <Typography variant="subHeading" weight="bold">
          Streaming Accounts
        </Typography>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Typography
            variant="body"
            weight="regular"
            color={theme.color.textMuted}
          >
            See all your connected streaming platforms.
          </Typography>
        </View>

        {/* Platforms List */}
        <View style={styles.platformsList}>
          {platforms.map((platform) => (
            <Pressable
              key={platform.id}
              style={styles.platformItem}
              onPress={() => handlePlatformPress(platform)}
            >
              <View style={styles.platformLeft}>
                <View
                  style={[
                    styles.logoContainer,
                    platform.name === "Netflix" && styles.netflixLogo,
                    platform.name === "Prime Video" && styles.primeLogo,
                  ]}
                >
                  {platform.name === "Netflix" && (
                    <Typography variant="h2" weight="extrabold" color="#E50914">
                      {platform.logo}
                    </Typography>
                  )}
                  {platform.name === "Prime Video" && (
                    <Typography variant="caption" weight="bold" color="#00A8E1">
                      prime
                    </Typography>
                  )}
                </View>
                <Typography variant="body" weight="medium">
                  {platform.name}
                </Typography>
              </View>

              {platform.isActive && (
                <View style={styles.activeBadge}>
                  <Typography
                    variant="caption"
                    weight="semibold"
                    color={theme.color.white}
                  >
                    Active
                  </Typography>
                </View>
              )}
            </Pressable>
          ))}

          {/* Add New Platform Button */}
          <Pressable style={styles.addButton} onPress={handleAddPlatform}>
            <View style={styles.addIconContainer}>
              {/* <PlusIcon width={20} height={20} color={theme.color.white} /> */}
            </View>
            <Typography variant="body" weight="medium">
              New streaming platform
            </Typography>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.m,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: theme.color.backgroundLight,
  },
  placeholder: {
    width: 40,
  },
  descriptionContainer: {
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.m,
  },
  platformsList: {
    paddingHorizontal: theme.spacing.l,
    gap: theme.spacing.s,
  },
  platformItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.color.backgroundLight,
    borderRadius: theme.radius.m,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
  },
  platformLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.m,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.s,
    justifyContent: "center",
    alignItems: "center",
  },
  netflixLogo: {
    backgroundColor: "#000000",
  },
  primeLogo: {
    backgroundColor: "#232F3E",
  },
  hboLogo: {
    backgroundColor: "#000000",
  },
  activeBadge: {
    backgroundColor: "#10B981",
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.s,
    borderRadius: theme.radius.s,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.color.backgroundLight,
    borderRadius: theme.radius.m,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    gap: theme.spacing.m,
    marginTop: theme.spacing.s,
  },
  addIconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.s,
    backgroundColor: theme.color.background,
    justifyContent: "center",
    alignItems: "center",
  },
}));
