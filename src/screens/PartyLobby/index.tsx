import { StyleSheet } from "react-native-unistyles";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import StackHeader from "@/src/components/StackHeader";
import { Image, View } from "react-native";
import Typography from "@/src/components/common/Typography";
import ClipboardCopy from "@/src/components/ClipBoard";
import { useRouter } from "expo-router";
import Button from "@/src/components/common/Button";

const PartyLobbyScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container} edges={["top","bottom"]}>
      <View style={styles.header}>
        <StackHeader handleBack={() => router.back()} title="Party Lobby" />
      </View>
      <View style={styles.sections}>
        <View style={styles.contentWrapper}>
          <View style={styles.description}>
            <Typography variant="subHeading" weight="bold">
              Three Musketeers!
            </Typography>
            <Typography variant="smallerBody" weight="medium">
              Our first watch party ever!
            </Typography>
          </View>
          <View style={styles.content}>
            <View style={styles.imgWrapper}>
              <Image
                style={styles.img}
                source={require("../../assets/images/image9.png")}
              />
            </View>
            <View style={styles.clipBoard}>
              <ClipboardCopy
                label="Share invite code to more people"
                text="7FQ9K2"
                style={styles.clip}
                align="center"
              />
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Button title="go-to-party">Go to Party</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PartyLobbyScreen;

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
    paddingHorizontal: theme.spacing.m,
  },
  header: {
    flex: 1,
  },
  sections: {
    flex: 4.5,
    alignItems: "center",
    justifyContent:"space-between"
  },
  description: {
    alignItems: "center",
    justifyContent: "center",

    paddingVertical: theme.spacing.m,
  },
  contentWrapper: {},
  content: {
    width: 320,
    // height: 314,
    backgroundColor: theme.color.backgroundLight,
    borderRadius: theme.radius.l,
    padding: theme.spacing.m,
    alignItems: "center",
  },
  imgWrapper: {
    width: 280,
    height: 158,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  clipBoard: {
    width: "100%",
    paddingBottom: theme.spacing.m,

    paddingTop: theme.spacing.xs,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.color.background,
    marginTop: theme.spacing.m,
    borderRadius: theme.spacing.m,
  },
  clip: {
    backgroundColor: theme.color.backgroundLight,
    alignItems: "center",
  },
  footer: {
    width:"100%",
    marginBottom:theme.spacing.l
  },
}));
