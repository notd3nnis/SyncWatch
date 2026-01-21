import { ReactNode } from "react";
import { SlideData } from "../components/OnboardingSlide/types";
import { NetflixLogo, OnboardingImgOne, PrimeLogo } from "../assets/svgs";

export const onboardingData: SlideData[] = [
  {
    id: 1,
    title: "Watch together. In sync.",
    description:
      "Start a watch party and stay in cinematic sync with friends & family.",
    image: <OnboardingImgOne />,
  },
  {
    id: 2,
    title: "One tap. Everyone's in!",
    description: "Start the movie, chat live, & react in real time.",
    image: <OnboardingImgOne />,
  },
];

type selectProviderType = {
  id: number;
  logo: ReactNode;
  title: string;
};
export const selectProviderData: selectProviderType[] = [
  {
    id: 1,
    logo: <NetflixLogo />,
    title: "Netflix",
  },
  {
    id: 2,
    logo: <PrimeLogo />,
    title: "Prime Video",
  },
];
