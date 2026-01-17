import React from "react";
import { View, Dimensions } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/src/components/Button";
import Typography from "@/src/components/Typography";
import OnboardingSlide from "@/src/components/OnboardingSlide";
import { GoogleLogo, OnboardingImgOne, AppleLogo } from "@/src/assets/svgs";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Onboarding() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <OnboardingSlide
        title="Watch together. In sync."
        description="Start a watch party and stay in cinematic sync with friends and family."
        image={<OnboardingImgOne />}
      />

      <View style={styles.bottomSection}>
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <Button icon={<AppleLogo />}>Continue with Apple</Button>

        <Button icon={<GoogleLogo />} variant="secondary">
          Continue with Google
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  bottomSection: {
    paddingHorizontal: theme.spacing.l,
    paddingBottom: theme.spacing.l,
    gap: theme.spacing.l,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.s,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: theme.radius.m,
    backgroundColor: theme.color.backgroundLight,
  },
  dotActive: {
    width: 30,
    backgroundColor: theme.color.light,
  },
  buttonGroup: {
    gap: theme.spacing.l,
  },
}));
