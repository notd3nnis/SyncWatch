import { View } from "react-native";
import React from "react";
import { styles } from "./styles";
import Typography from "../common/Typography";
import { NotificationIcon } from "@/src/assets/svgs";
import { HeaderProps } from "./types";

const Header: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <View style={styles.container}>
      <View>
        <Typography variant="subHeading" weight="semibold">
          {title}
        </Typography>
        <Typography variant="smallBody">{description}</Typography>
      </View>
      <View style={styles.notificationContainer}>
        <NotificationIcon />
      </View>
    </View>
  );
};

export default Header;
