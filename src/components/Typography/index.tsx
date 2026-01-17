import React from "react";
import { Text, TextProps } from "react-native";
import { UnistylesVariants } from "react-native-unistyles";
import { styles } from "./styles";

// types
type TypographyVariants = UnistylesVariants<typeof styles>;
type TypographyProps = TextProps &
  TypographyVariants & {
    color?: string;
    align?: string;
    style?: any;
    children: React.ReactNode;
  };

const Typography: React.FC<TypographyProps> = ({
  color,
  variant,
  align,
  weight,
  children,
  style,
  ...props
}) => {
  styles.useVariants({
    variant: variant,
    weight: weight,
  });
  return <Text {...props} style={[style,styles.TextStyle(color, align)]}>{children}</Text>;
};

export default Typography;
