import React from "react";
import { Text, TextProps } from "react-native";
import { UnistylesVariants } from "react-native-unistyles";
import { styles } from "./styles";

// types
type TypographyVariants = UnistylesVariants<typeof styles>;
type TypographyProps = TextProps &
  TypographyVariants & {
    color?: string;
    children: React.ReactNode;
  };

const Typography: React.FC<TypographyProps> = ({
  color,
  tag,
  weight,
  children,
}) => {
  styles.useVariants({
    tag,
    weight,
  });
  return <Text style={styles.TextStyle(color)}>{children}</Text>;
};

export default Typography;
