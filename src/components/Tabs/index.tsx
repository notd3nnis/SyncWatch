import React from "react";
import { View, Pressable } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import Typography from "../common/Typography";

interface TabOption {
  label: string;
  value: string;
}

interface CustomTabProps {
  options: TabOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

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
              weight="medium"
              color={isSelected ? theme.color.white : theme.color.textMuted}
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

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    backgroundColor: theme.color.backgroundLight,
    borderRadius: theme.radius.m,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.s,
  },
  tabSelected: {
    backgroundColor: theme.color.background,
  },
  tabFirst: {
    // Additional styling for first tab if needed
  },
  tabLast: {
    // Additional styling for last tab if needed
  },
  tabPressed: {
    opacity: 0.7,
  },
}));
