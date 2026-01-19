import React from "react";
import { Text } from "react-native";
import { styles } from "./styles";
import { TypographyProps } from "./types";

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
  return (
    <Text {...props} style={[style, styles.TextStyle(color, align)]}>
      {children}
    </Text>
  );
};

export default Typography;
