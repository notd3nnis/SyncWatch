import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";
interface ButtonProps {
  children: string;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

function Button({
  children,
  variant = "primary",
  icon,
  onPress,
  disabled = false,
}: ButtonProps) {
  styles.useVariants({
    variant,
  });
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.content}>
        {icon && icon}
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button