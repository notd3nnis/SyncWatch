import { Pressable, View, } from "react-native";
import { styles } from "./styles";
import Typography from "../Typography";
import { CustomButtonProps } from "./types";

function Button({
  children,
  variant = "primary",
  icon,
  onPress,
  disabled = false,
}: CustomButtonProps) {
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
        <Typography variant="body" weight="medium">{children}</Typography>
      </View>
    </Pressable>
  );
}

export default Button;
