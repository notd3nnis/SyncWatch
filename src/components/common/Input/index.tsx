import React, { useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import Typography from "../Typography";
import { styles } from "./styles";
import { InputProps } from "./types";

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  placeholder,
  variant,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useUnistyles();

  styles.useVariants({
    variant: variant,
  });
  return (
    <View style={styles.wrapper}>
      {/* Label */}
      {label && (
        <Typography variant="smallBody" weight="medium" style={styles.label}>
          {label}
        </Typography>
      )}

      <View
        style={[
          styles.container,
          isFocused && styles.containerFocused,
          error && styles.containerError,
        ]}
      >
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.color.gray02}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {rightIcon && (
          <Pressable
            onPress={onRightIconPress}
            style={styles.iconRight}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </Pressable>
        )}
      </View>

      {error && (
        <Typography variant="caption" weight="regular" style={styles.error}>
          {error}
        </Typography>
      )}
    </View>
  );
};

export default Input;
