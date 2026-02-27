import React, { useState } from "react";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Pressable, ScrollView, Image } from "react-native";

import Input from "@/src/components/common/Input";
import Button from "@/src/components/common/Button";
import Typography from "@/src/components/common/Typography";
import { avatars } from "@/src/utils/dummyData";
import StackHeader from "@/src/components/StackHeader";
import { useAuth } from "@/src/context/AuthContext";

export default function EditProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const [name, setName] = useState(user?.displayName ?? "Snow Olohijere");
  const [email, setEmail] = useState(user?.email ?? "snow@gmail.com");

  const handleSave = () => {
    console.log("[EditProfileScreen] Save changes:", {
      selectedAvatar,
      name,
      email,
    });
    console.log(
      "[EditProfileScreen] NOTE: Persisting profile to backend is not implemented yet."
    );
    router.back();
  };

  const handleBack = () => {
    router.back();
  };
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StackHeader handleBack={() => handleBack()} title="Edit Profile" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.descriptionContainer}>
          <Typography variant="smallBody" weight="medium">
            Select from the avatars below to change your profile icon.
          </Typography>
        </View>
        <View style={styles.avatarGrid}>
          {avatars.map((avatar) => (
            <Pressable
              key={avatar.id}
              style={[
                styles.avatarContainer,
                selectedAvatar === avatar.id && styles.avatarSelected,
              ]}
              onPress={() => setSelectedAvatar(avatar.id)}
            >
              <Image source={avatar.url} style={styles.avatar} />
            </Pressable>
          ))}
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Input
              label="Name"
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              variant="secondary"
            />
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              variant="secondary"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="save changes" variant="primary" onPress={handleSave}>
            Save changes
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
    paddingHorizontal: theme.spacing.m,
  },
  descriptionContainer: {
    paddingTop: theme.spacing.m,
    paddingBottom: theme.spacing.l,
  },
  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.m,
    marginBottom: theme.spacing.xl,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 4,
    backgroundColor: theme.color.backgroundLight,
  },
  avatarSelected: {
    backgroundColor: theme.color.primary,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 26,
  },
  form: {
    gap: theme.spacing.l,
  },
  inputGroup: {
    gap: theme.spacing.s,
  },
  label: {
    marginBottom: theme.spacing.xs,
  },
  buttonContainer: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
}));
