import { TextProps } from "react-native";
import { UnistylesVariants } from "react-native-unistyles";
import { styles } from "./styles";

type TypographyVariants = UnistylesVariants<typeof styles>;

export type TypographyProps = TextProps &
  TypographyVariants & {
    color?: string;
    align?: string;
    style?: any;
    children: React.ReactNode;
  };
