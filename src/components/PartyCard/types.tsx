import { ImageSourcePropType } from "react-native";

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  color: string;
}

export interface PartyCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  movieImage: ImageSourcePropType;
  movieTitle: string;
  participants: Participant[];
  status: "Upcoming" | "Ended";
  onPress?: () => void;
}
