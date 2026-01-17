export interface OnboardingSlideData {
  id: number;
  title: string;
  description: string;
  image: React.ReactNode;
}

export const onboardingSlides: OnboardingSlideData[] = [
  {
    id: 1,
    title: 'Watch together. In sync.',
    description: 'Start a watch party and stay in cinematic sync with friends and family.',
    image: null, // Will be set in component
  },
  {
    id: 2,
    title: 'Chat while you watch',
    description: 'React and discuss in real-time without missing a moment.',
    image: null,
  },
  {
    id: 3,
    title: 'Create your party',
    description: 'Invite friends and start watching together instantly.',
    image: null,
  },
];