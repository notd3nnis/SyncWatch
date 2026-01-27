import React from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";

const Parties = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Parties</Text>
    </SafeAreaView>
  );
};

export default Parties;

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
}));
