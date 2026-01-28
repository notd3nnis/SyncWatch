import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import React from "react";

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
}));
