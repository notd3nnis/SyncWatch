import {
SharedValue,
} from "react-native-reanimated";

export interface SlideData {
id: number;
title: string;
description: string;
image: React.ReactNode;
}

export interface SlideItemProps {
slide: SlideData;
index: number;
scrollX: SharedValue<number>;
}