import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./styles";
import Button from "@/src/components/common/Button";
import { GoogleLogo, AppleLogo } from "@/src/assets/svgs";
import OnboardingSlides from "@/src/components/OnboardingSlide";
import { onboardingData } from "../../utils/dummyDatas";

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const router = useRouter();
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
            onPress={() => router.navigate("/")}
          >
            Continue with Google
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
