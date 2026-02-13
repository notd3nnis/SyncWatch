import { ButtonProps } from "react-native";

export interface CustomButtonProps extends ButtonProps {
  children: string;
  variant?: "primary" | "secondary" | "tertiary" | "netural";
  icon?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  color?: string;
}
