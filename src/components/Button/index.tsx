import { Pressable, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

interface ButtonProps {
  children: string;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  icon,
  onPress,
  disabled = false,
}: ButtonProps) {
    
  const { styles } = useUnistyles(stylesheet, { variant });

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

const stylesheet = StyleSheet.create((theme) => ({
  container: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    borderRadius: theme.radius.m,
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      variant: {
        primary: {
          backgroundColor: theme.color.primary,
        },
        secondary: {
          backgroundColor: theme.color.secondary,
        },
      },
    },
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s,
  },
  text: {
    color: theme.color.white,
    fontSize: 15,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
}));