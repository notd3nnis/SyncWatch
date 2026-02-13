import React from "react";
import { ScrollView, View } from "react-native";

import { styles } from "../styles";
import { CreatePartyProps } from "../types";
import Button from "@/src/components/common/Button";
import Typography from "@/src/components/common/Typography";
import { LeftBanner, RightBanner } from "@/src/assets/svgs";
import ClipboardCopy from "@/src/components/ClipBoard";

export const Success = ({
  onClose,
  movie,
  handleCreateParty,
}: CreatePartyProps) => {
  return (
    <ScrollView>
      <View style={styles.createdPartysection}>
        <Typography align="center" variant="body" weight="regular">
          You’ve created your watch party:
        </Typography>
        <View style={styles.bannerCard}>
          <View style={styles.bannerLeft}>
            <RightBanner />
          </View>
          <Typography variant="subHeading" weight="bold">
            Three Muskeeteers!
          </Typography>
          <Typography variant="smallerBody" weight="medium">
            Our first watch party ever!
          </Typography>
          <View style={styles.bannerRight}>
            <LeftBanner />
          </View>
        </View>
        <View>
          <ClipboardCopy
            text="7FQ9K2"
            label="Share invite code"
          />
        </View>
        <Button title="go-to-party">Go to Party</Button>
      </View>
    </ScrollView>
  );
};
