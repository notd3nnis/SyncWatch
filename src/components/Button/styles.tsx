import { StyleSheet } from 'react-native-unistyles';


export const styles = StyleSheet.create((theme) => ({
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
    color: theme.color.light,
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