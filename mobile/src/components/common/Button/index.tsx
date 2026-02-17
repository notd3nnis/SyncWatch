import { Pressable, View } from "react-native";
import { styles } from "./styles";
import Typography from "../Typography";
import { CustomButtonProps } from "./types";

function Button({
  children,
  variant = "primary",
  icon,
  color,
  onPress,
  disabled = false,
  ...props
}: CustomButtonProps) {
  styles.useVariants({
    variant,
  });
  return (
    <Pressable
      onPress={onPress}
      {...props}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.content}>
        {icon && icon}
        <Typography color={color}  variant="body" weight="medium">
          {children}
        </Typography>
      </View>
    </Pressable>
  );
}

export default Button;
