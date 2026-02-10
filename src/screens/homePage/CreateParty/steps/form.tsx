import React from "react";
import { View, Image, ScrollView } from "react-native";

import { styles } from "../styles";
import Typography from "@/src/components/common/Typography";
import Input from "@/src/components/common/Input";
import Button from "@/src/components/common/Button";
import { CreatePartyProps } from "../types";

export const Form = ({
  onClose,
  movie,
  handleCreateParty,
}: CreatePartyProps) => {
  return (
    <ScrollView>
      <View style={styles.description}>
        <View style={styles.banner}>
          <Image
            resizeMode="cover"
            source={movie?.image}
            style={styles.bannerImg}
          />
        </View>
        <View>
          <Typography variant="body" weight="regular">
            You’re about to create a Watch Party for
          </Typography>
          <Typography variant="smallBody" weight="bold">
            “THE UNFORGIVABLE”
          </Typography>
        </View>
      </View>
      <View style={styles.formContainer}>
        <Input placeholder="Enter a name" label="Set party name" />
        <Input
          placeholder="Describe your watch party"
          label="Enter a description (optional)"
        />
        <Button onPress={handleCreateParty} title="generate invite">
          Generate invite
        </Button>
      </View>
    </ScrollView>
  );
};
