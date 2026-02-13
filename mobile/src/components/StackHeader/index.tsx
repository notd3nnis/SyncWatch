import React from "react";
import { Pressable, View } from "react-native";
import { styles } from "./styles";
import { BackIcon } from "@/src/assets/svgs";
import Typography from "../common/Typography";
import { useUnistyles } from "react-native-unistyles";

type HeaderProps = {
  handleBack: () => void;
  title: string;
};

const StackHeader = ({ handleBack, title }: HeaderProps) => {
  const { theme } = useUnistyles();
  return (
    <View style={styles.header}>
      <Pressable onPress={handleBack} style={styles.backButton}>
        <BackIcon width={15} height={13} color={theme.color.white} />
      </Pressable>
      <View style={styles.textholder}>
        <Typography variant="subHeading" weight="bold">
          {title}
        </Typography>
      </View>
    </View>
  );
};

export default StackHeader;
