import { styled, Stack } from "tamagui";

export const CustomButton = styled(Stack, {
  name: "Button",

  display: "flex",
  flexDirection: "row",
  justify: "center",
  verticalAlign: "middle",


  variants: {
    primary: {},
    secondary: {},
  },
});
