import React, { useState } from "react";
import {
  View,
  Modal,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useRouter } from "expo-router";
import Typography from "../common/Typography";
import Button from "../common/Button";
import { CloseIcon } from "@/src/assets/svgs";
import { Movie } from "./types";
import Input from "../common/Input";
// import { Movie } from "@/src/types";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface MovieModalProps {
  visible: boolean;
  onClose: () => void;
  movie: Movie | null;
}
type Stages = "details" | "form" | "success";

const MovieModal: React.FC<MovieModalProps> = ({ visible, onClose, movie }) => {
  const [stage, setStage] = useState<Stages>("details");
  if (!movie) return null;

  const handleCreateParty = () => {
    if (stage === "details") {
      setStage("form");
    } else if (stage === "form") {
      // onClose();
      setStage("success");
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        {stage === "details" && (
          <View style={styles.modalContainer}>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <View style={styles.closeIconWrapper}>
                <CloseIcon />
              </View>
            </Pressable>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.posterContainer}>
                <Image
                  source={movie.image}
                  style={styles.poster}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.content}>
                <View style={styles.rankBadge}>
                  <View style={styles.rank}>
                    <Typography variant="smallerBody" weight="xxBold">
                      TOP
                    </Typography>
                    <Typography variant="caption" weight="xxBold">
                      10
                    </Typography>
                  </View>
                  <Typography variant="smallBody" weight="bold">
                    {`${"#"}${movie.id} in Movies Today`}
                  </Typography>
                </View>

                <Typography variant="smallBody" weight="regular">
                  {movie.description}
                </Typography>
                <View style={styles.buttonContainer}>
                  <Button
                    title="create party"
                    variant="primary"
                    onPress={handleCreateParty}
                  >
                    Create watch party
                  </Button>
                </View>
              </View>
            </ScrollView>
          </View>
        )}

        {stage === "form" && (
          <View style={styles.modalContainer}>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <View style={styles.closeIconWrapper}>
                <CloseIcon />
              </View>
            </Pressable>
            <ScrollView>
              <View style={styles.description}>
                <View style={styles.banner}>
                  <Image
                    resizeMode="cover"
                    source={movie.image}
                    style={styles.bannerImg}
                  />
                </View>
                <View>
                  <Typography variant="smallBody" weight="regular">
                    You’re about to create a Watch Party for
                  </Typography>
                  <Typography variant="smallBody" weight="bold">
                    “THE UNFORGIVABLE”
                  </Typography>
                </View>
              </View>
              <View style={styles.formContainer}>
                <Input placeholder="Enter a name" label="Set party name" />
                <Input
                  placeholder="Describe your watch party"
                  label="Enter a description (optional)"
                />
                <Button title="generate invite">Generate invite</Button>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default MovieModal;

const styles = StyleSheet.create((theme) => ({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: theme.color.background,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    maxHeight: SCREEN_HEIGHT * 0.8,
    paddingHorizontal: theme.spacing.m,
    paddingBottom: 20,
    paddingTop: 64,
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing.m,
    right: theme.spacing.m,
    zIndex: 10,
  },
  closeIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  posterContainer: {
    width: "100%",
    height: 192,
    borderRadius: theme.radius.m,
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  content: {
    gap: theme.spacing.l,
  },

  rankBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: 16,
  },
  rank: {
    alignItems: "center",
    backgroundColor: "#8C1C13",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 2,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  // form style
  description: {
    flexDirection: "row",
    gap: 12,
    paddingBottom: 10,
  },
  banner: {
    width: 78,
    height: 44,
    borderRadius: 2,
  },
  bannerImg: {
    width: "100%",
    height: "100%",
  },

  formContainer: {
    gap: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
}));
