import React from "react";
import { Pressable, View, Image, ScrollView } from "react-native";

import { styles } from "../styles";
import Typography from "@/src/components/common/Typography";
import Button from "@/src/components/common/Button";
import { CloseIcon } from "@/src/assets/svgs";
import { CreatePartyProps } from "../types";

export const Details = ({ onClose, movie, handleCreateParty }: CreatePartyProps) => {
  return (
    <View style={styles.modalContainer}>
      <Pressable style={styles.closeButton} onPress={onClose}>
        <View style={styles.closeIconWrapper}>
          <CloseIcon />
        </View>
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.posterContainer}>
          <Image
            source={movie?.image}
            style={styles.poster}
            resizeMode="cover"
          />
        </View>
        <View style={styles.content}>
          <View style={styles.rankBadge}>
            <View style={styles.rank}>
              <Typography variant="smallerBody" weight="xxBold">
                TOP
              </Typography>
              <Typography variant="caption" weight="xxBold">
                10
              </Typography>
            </View>
            <Typography variant="smallBody" weight="bold">
              {`${"#"}${movie?.id} in Movies Today`}
            </Typography>
          </View>
          <Typography variant="smallBody" weight="regular">
            {movie?.description}
          </Typography>
          <View style={styles.buttonContainer}>
            <Button
              title="create party"
              variant="primary"
              onPress={handleCreateParty}
            >
              Create watch party
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


