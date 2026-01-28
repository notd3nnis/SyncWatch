import React, { useEffect } from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import SlideItem from "./slideItem";
import { SlideData } from "./types";

import { styles } from "./styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

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
      const x = event.contentOffset?.x ?? 0;
      if (!Number.isFinite(x) || SCREEN_WIDTH <= 0) return;
      const newIndex = Math.round(x / SCREEN_WIDTH);

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
