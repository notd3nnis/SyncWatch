import React, { useEffect } from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  SharedValue,
} from "react-native-reanimated";

import Typography from "../Typography";
import { styles } from "./styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export interface SlideData {
  id: number;
  title: string;
  description: string;
  image: React.ReactNode;
}

interface OnboardingSlidesProps {
  slides: SlideData[];
  autoSlideInterval?: number; // in milliseconds
  onSlideChange?: (index: number) => void;
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export default function OnboardingSlides({
  slides,
  autoSlideInterval = 3000,
  onSlideChange,
  currentIndex,
  onIndexChange,
}: OnboardingSlidesProps) {
  const scrollX = useSharedValue(0);
  const scrollViewRef = React.useRef<Animated.ScrollView>(null);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * SCREEN_WIDTH,
        animated: true,
      });
      onIndexChange(nextIndex);
      onSlideChange?.(nextIndex);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [
    onIndexChange,
    onSlideChange,
    currentIndex,
    slides.length,
    autoSlideInterval,
  ]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
    onMomentumEnd: (event) => {
      const newIndex = Math.round(event.contentOffset.x / SCREEN_WIDTH);
      if (newIndex !== currentIndex) {
        onIndexChange(newIndex);
        onSlideChange?.(newIndex);
      }
    },
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <SlideItem
            key={slide.id}
            slide={slide}
            index={index}
            scrollX={scrollX}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
}

// Individual Slide Item Component
interface SlideItemProps {
  slide: SlideData;
  index: number;
  scrollX: SharedValue<number>;
}

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
