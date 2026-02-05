import React, { useState } from "react";
import { View, Pressable, Switch, ScrollView, Image } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";
import Typography from "@/src/components/common/Typography";
import {
  AccountIcon,
  HelpCenterIcon,
  LogoutIcon,
  NextPageIcon,
  ProfileIcon,
  PushNoticationIcon,
} from "@/src/assets/svgs";

export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const { theme } = useUnistyles();

  const handlePress = (item: string) => {
    console.log(`Pressed: ${item}`);
  };

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../assets/images/Avatar.png")}
              style={styles.avatar}
            />
          </View>
          <Typography variant="subHeading" weight="semibold">
            Snow Olohijere
          </Typography>
          <Typography
            variant="smallBody"
            weight="medium"
            color={theme.color.textMuted}
          >
            snow@gmail.com
          </Typography>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Typography
            variant="smallBody"
            weight="regular"
            color={theme.color.textMuted}
            style={styles.sectionTitle}
          >
            Account
          </Typography>

          <View style={styles.menuGroup}>
            <Pressable
              style={styles.menuItem}
              onPress={() => handlePress("Personal Info")}
            >
              <View style={styles.menuLeft}>
                <View style={styles.iconWrapper}>
                  <Typography variant="body">
                    <ProfileIcon
                      width={20}
                      height={20}
                      color={theme.color.textMuted}
                    />
                  </Typography>
                </View>
                <Typography variant="body" weight="medium">
                  Personal Info
                </Typography>
              </View>
              <NextPageIcon />
            </Pressable>

            <View style={styles.divider} />

            <Pressable
              style={styles.menuItem}
              onPress={() => handlePress("Streaming Accounts")}
            >
              <View style={styles.menuLeft}>
                <View style={styles.iconWrapper}>
                  <Typography variant="body">
                    <AccountIcon />
                  </Typography>
                </View>
                <Typography variant="body" weight="medium">
                  Streaming Accounts
                </Typography>
              </View>
              <NextPageIcon />
            </Pressable>

            <View style={styles.divider} />

            <View style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <View style={styles.iconWrapper}>
                  <Typography variant="body">
                    <PushNoticationIcon
                      width={20}
                      height={20}
                      color={theme.color.textMuted}
                    />
                  </Typography>
                </View>
                <Typography variant="body" weight="medium">
                  Push Notifications
                </Typography>
              </View>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{
                  false: theme.color.gray02,
                  true: theme.color.background,
                }}
                thumbColor={theme.color.white}
              />
            </View>
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Typography
            variant="caption"
            weight="medium"
            color={theme.color.textMuted}
            style={styles.sectionTitle}
          >
            Support
          </Typography>

          <View style={styles.menuGroup}>
            <Pressable
              style={styles.menuItem}
              onPress={() => handlePress("Security & Help Center")}
            >
              <View style={styles.menuLeft}>
                <View style={styles.iconWrapper}>
                  <Typography variant="body">
                    <HelpCenterIcon
                      width={20}
                      height={20}
                      color={theme.color.textMuted}
                    />
                  </Typography>
                </View>
                <Typography variant="body" weight="medium">
                  Security & Help Center
                </Typography>
              </View>
              <NextPageIcon />
            </Pressable>

            <View style={styles.divider} />

            <Pressable style={styles.menuItem} onPress={handleLogout}>
              <View style={styles.menuLeft}>
                <View style={styles.iconWrapper}>
                  <LogoutIcon
                    width={20}
                    height={20}
                    color={theme.color.error}
                  />
                </View>
                <Typography variant="body" weight="medium">
                  Logout
                </Typography>
              </View>
              <NextPageIcon />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
    // paddingHorizontal: theme.spacing.m,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: theme.spacing.xl,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: theme.color.primary,
    padding: 4,
    marginBottom: theme.spacing.m,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 46,
  },

  section: {
    marginBottom: theme.spacing.l,
  },
  sectionTitle: {
    marginBottom: theme.spacing.s,
  },
  menuGroup: {},
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    borderRadius: theme.radius.m,
    backgroundColor: theme.color.backgroundLight,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.m,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 16,
    backgroundColor: theme.color.background,
    marginLeft: theme.spacing.m + 32 + theme.spacing.m,
  },
}));
