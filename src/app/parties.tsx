import React from "react";
import HomePage from "../screens/homePage";
import { StyleSheet } from "react-native-unistyles";
import { View } from "react-native";

const Parties = () => {
  return (
    <View style={styles.container}>
      <HomePage />
    </View>
  );
};

export default Parties;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    backgroundColor: theme.color.background,
    flex: 1,
    // paddingBottom: rt.insets.bottom,
  },
}));
