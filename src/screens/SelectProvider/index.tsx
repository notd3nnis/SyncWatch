import { useState } from "react";
import { StyleSheet } from "react-native-unistyles";
import { Pressable, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Logo } from "@/src/assets/svgs";
import Button from "@/src/components/Button";
import Typography from "@/src/components/Typography";
import { selectProviderData } from "@/src/utils/dummyDatas";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const SelectProvider = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <View style={styles.logoWrapper}>
            <Logo />
          </View>
          <Typography variant="subHeading" weight="medium">
            syncwatch
          </Typography>
        </View>
        <View style={styles.typographyContainer}>
          <Typography variant="h2" weight="bold">
            Select a streaming service.
          </Typography>
          <Typography variant="body" weight="medium">
            We’ll open it in sync for everyone.
          </Typography>
        </View>
        <View style={styles.streamServicesContainer}>
          {selectProviderData.map((item) => {
            return (
              <Pressable
                key={item.id}
                style={styles.provider}
                onPress={() => {
                  setSelectedId(item.id);
                }}
              >
                <View style={styles.logoFrame}>
                  <View style={styles.logo}>{item.logo}</View>
                  <Typography variant="body" weight="medium">
                    {item.title}
                  </Typography>
                </View>
                <View
                  style={[
                    styles.dot,
                    selectedId === item.id && styles.dotActive,
                  ]}
                />
              </Pressable>
            );
          })}
        </View>
      </View>
      <Button disabled={selectedId === null} title="slelectProvider">
        Continue to homepage
      </Button>
    </SafeAreaView>
  );
};

export default SelectProvider;

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.m,
  },
  headerContainer: {
    marginTop: theme.spacing.l,
    flexDirection: "row",
    alignItems: "center",
  },
  logoWrapper: {
    marginTop: theme.spacing.xs,
    marginRight: theme.spacing.s,
  },
  typographyContainer: {
    paddingTop: theme.spacing.l,
    paddingBottom: theme.spacing.l,
    gap: theme.spacing.s,
  },
  streamServicesContainer: {
    paddingVertical: theme.spacing.l,
    flexDirection: "column",
    gap: theme.spacing.l,
  },
  provider: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.color.backgroundLight,
    height: SCREEN_HEIGHT * 0.08,
    padding: theme.spacing.m,
    borderRadius: theme.radius.l,
  },
  logoFrame: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    marginRight: theme.spacing.s,
  },
  dot: {
    width: 18,
    height: 18,
    borderWidth: theme.radius.xs,
    borderColor: theme.color.gray02,
    borderRadius: 50,
  },
  dotActive: {
    backgroundColor: theme.color.white,
    borderColor: theme.color.white,
  },
}));
