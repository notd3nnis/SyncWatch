import React from "react";
import { StyleSheet } from "react-native-unistyles";
import { Dimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Typography from "@/src/components/Typography";
import { Logo } from "@/src/assets/svgs";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SelectProvider = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.logoWrapper}>
          <Logo />
        </View>
        <Typography variant="h2" weight="bold">
          syncwatch
        </Typography>
      </View>
    </SafeAreaView>
  );
};

export default SelectProvider;

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.l,
  },
  headerContainer: {
    width: "47%",
    marginTop: theme.spacing.l,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "red",
  },
  logoWrapper: {
    alignSelf: "flex-end",
  },
}));
