import React from "react";
import { Switch, ViewStyle } from "react-native";
import { useUnistyles } from "react-native-unistyles";

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  style,
}) => {
  const { theme } = useUnistyles();
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{
        false: theme.color.gray02,
        true: theme.color.primary,
      }}
      thumbColor={theme.color.white}
      ios_backgroundColor={theme.color.gray02}
      style={style}
    />
  );
};

export default CustomSwitch;
