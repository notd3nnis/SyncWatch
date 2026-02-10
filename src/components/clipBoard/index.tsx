import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import * as Clipboard from "expo-clipboard";
import Typography from "../common/Typography";
import { styles } from "./styles";
import { ClipboardCopyProps } from "./types";

const ClipboardCopy: React.FC<ClipboardCopyProps> = ({
  text,
  style,
  label,
  align
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(text);
    setCopied(true);

    // Reset after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const { theme } = useUnistyles();
  return (
    <View>
      <View style={styles.label}>
        <Typography variant="smallBody" weight="regular" align={align}>
          {label}
        </Typography>
      </View>
      <View style={[styles.container, style]}>
        <Typography variant="body" weight="regular">
          {text}
        </Typography>
        <Pressable
          style={({ pressed }) => [
            styles.copyButton,
            pressed && styles.copyButtonPressed,
          ]}
          onPress={handleCopy}
        >
          <View style={styles.iconContainer}>
            <View style={styles.clipboardIcon}>
              <View style={styles.clipboardBack} />
              <View style={styles.clipboardFront} />
            </View>
          </View>
          <Typography
            variant="smallBody"
            weight="semibold"
            color={theme.color.background}
          >
            {copied ? "Copied!" : "Copy"}
          </Typography>
        </Pressable>
      </View>
    </View>
  );
};

export default ClipboardCopy;
