import Animated, {
useAnimatedStyle,
interpolate,
} from "react-native-reanimated";
import { View, Dimensions } from "react-native";
import Typography from "../Typography";
import { SlideItemProps } from "./types"
import { styles } from "./styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");



// Individual Slide Item Component
function SlideItem({ slide, index, scrollX }: SlideItemProps) {
const animatedStyle = useAnimatedStyle(() => {
const inputRange = [
(index - 1) * SCREEN_WIDTH,
index * SCREEN_WIDTH,
(index + 1) * SCREEN_WIDTH,
];

const scale = interpolate(
scrollX.value,
inputRange,
[0.8, 1, 0.8],
"clamp",
);

const opacity = interpolate(
scrollX.value,
inputRange,
[0.5, 1, 0.5],
"clamp",
);

return {
transform: [{ scale }],
opacity,
};
});

return (
<View style={styles.slideContainer}>
<Animated.View style={[styles.imageSection, animatedStyle]}>
<View style={styles.imageFrame}>{slide.image}</View>
</Animated.View>
<View style={styles.textSection}>
<Typography variant="h2" weight="bold" align="center">
{slide.title}
</Typography>
<Typography variant="smallBody" weight="medium" align="center">
{slide.description}
</Typography>
</View>
</View>
);
}

export default SlideItem;