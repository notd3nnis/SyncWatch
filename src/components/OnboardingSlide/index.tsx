import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Typography from "../Typography";

interface OnboardingSlideProps {
  title: string;
  description: string;
  image: React.ReactNode;
}

export default function OnboardingSlide({
  title,
  description,
  image,
}: OnboardingSlideProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageSection}>
        <View style={styles.imageFrame}>{image}</View>
      </View>
      <View style={styles.textSection}>
        <Typography variant="h2" weight="bold" align="center">
          {title}
        </Typography>
        <Typography variant="body" weight="regular" align="center">
          {description}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },

  imageSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spacing.l,
  },
  imageFrame: {
    backgroundColor: "#1A1A1A",
    width: 342,
    height: 342,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.l,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.l,
  },
  textSection: {
    alignItems: "center",
    gap: theme.spacing.s,
    paddingVertical: theme.spacing.l,
  },
}));
