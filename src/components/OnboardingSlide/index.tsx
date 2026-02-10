import React, { useEffect, useRef } from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  runOnJS,
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
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-slide effect
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (!scrollViewRef.current) {
        return;
      }

      const nextIndex = (currentIndex + 1) % slides.length;
      
      try {
        scrollViewRef.current?.scrollTo({
          x: nextIndex * SCREEN_WIDTH,
          animated: true,
        });
        onIndexChange(nextIndex);
        onSlideChange?.(nextIndex);
      } catch (error) {
        console.log("Auto-scroll error:", error);
      }
    }, autoSlideInterval);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [currentIndex, slides.length, autoSlideInterval, onIndexChange, onSlideChange]);

  // Function to handle index change on JS thread
  const handleIndexChange = (newIndex: number) => {
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < slides.length) {
      onIndexChange(newIndex);
      onSlideChange?.(newIndex);
    }
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
    onMomentumEnd: (event) => {
      const x = event.contentOffset?.x ?? 0;
      if (!Number.isFinite(x) || SCREEN_WIDTH <= 0) return;
      
      const newIndex = Math.round(x / SCREEN_WIDTH);
      
      // Use runOnJS to safely call the handler on JS thread
      runOnJS(handleIndexChange)(newIndex);
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
        bounces={false}
        decelerationRate="fast"
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