import React from "react";
import { View, Pressable } from "react-native";
import { useUnistyles } from "react-native-unistyles";

import Typography from "../common/Typography";
import { styles } from "./styles";
import { CustomTabProps } from "./types";

const CustomTab: React.FC<CustomTabProps> = ({
  options,
  selectedValue,
  onValueChange,
}) => {
  const { theme } = useUnistyles();

  return (
    <View style={styles.container}>
      {options.map((option, index) => {
        const isSelected = selectedValue === option.value;
        const isFirst = index === 0;
        const isLast = index === options.length - 1;

        return (
          <Pressable
            key={option.value}
            style={({ pressed }) => [
              styles.tab,
              isSelected && styles.tabSelected,
              isFirst && styles.tabFirst,
              isLast && styles.tabLast,
              pressed && styles.tabPressed,
            ]}
            onPress={() => onValueChange(option.value)}
          >
            <Typography
              variant="body"
              weight="regular"
              color={isSelected ? theme.color.white : theme.color.gray02}
            >
              {option.label}
            </Typography>
          </Pressable>
        );
      })}
    </View>
  );
};

export default CustomTab;
