import { TextInputProps } from "react-native";

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "secondary";
  onRightIconPress?: () => void;
}
