import React, { useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/src/components/Button";
import { GoogleLogo, OnboardingImgOne, AppleLogo } from "@/src/assets/svgs";
import OnboardingSlides from "@/src/components/OnboardingSlide";
import { SlideData } from "../../components/OnboardingSlide/types"


const onboardingData: SlideData[] = [
  {
    id: 1,
    title: "Watch together. In sync.",
    description:
      "Start a watch party and stay in cinematic sync with friends & family.",
    image: <OnboardingImgOne />,
  },
  {
    id: 2,
    title: "One tap. Everyone's in!",
    description: "Start the movie, chat live, & react in real time.",
    image: <OnboardingImgOne />,
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <OnboardingSlides
        slides={onboardingData}
        autoSlideInterval={3000} // 3 seconds
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
        onSlideChange={(index) => index}
      />
      <View style={styles.bottomSection}>
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.dotActive]}
            />
          ))}
        </View>
        <View style={styles.buttonGroup}>
          <Button
            title="appleLogo"
            icon={<AppleLogo width={20} height={20} />}
            variant="primary"
          >
            Continue with Apple
          </Button>

          <Button
            title="googleLogo"
            icon={<GoogleLogo width={20} height={20} />}
            variant="secondary"
          >
            Continue with Google
          </Button>
        </View>
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
    marginBottom: theme.spacing.l,
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
    height: 10,
    borderRadius: theme.radius.s,
    backgroundColor: theme.color.backgroundLight,
  },
  dotActive: {
    width: 40,
    backgroundColor: theme.color.white,
    borderRadius: theme.radius.l,
  },
  buttonGroup: {
    gap: theme.spacing.m,
  },
}));
