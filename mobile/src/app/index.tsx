import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import Onboarding from "../screens/onBoarding/index";
import { useAuth } from "@/src/context/AuthContext";

const OnboardingPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)/home");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  return <Onboarding />;
};

export default OnboardingPage;
