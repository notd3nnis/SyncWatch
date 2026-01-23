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
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useUnistyles();

  return (
    <View style={styles.wrapper}>
      {/* Label */}
      {label && (
        <Typography variant="smallBody" weight="medium" style={styles.label}>
          {label}
        </Typography>
      )}

      {/* Input Container */}
      <View
        style={[
          styles.container,
          isFocused && styles.containerFocused,
          error && styles.containerError,
        ]}
      >
        {/* Left Icon */}
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

        {/* Text Input */}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.color.textMuted}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Right Icon */}
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

      {/* Error Message */}
      {error && (
        <Typography variant="caption" weight="regular" style={styles.error}>
          {error}
        </Typography>
      )}
    </View>
  );
};

export default Input;
