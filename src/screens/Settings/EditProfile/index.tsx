import React, { useState } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Pressable, ScrollView, Image } from "react-native";

import Input from "@/src/components/common/Input";
import Button from "@/src/components/common/Button";
import Typography from "@/src/components/common/Typography";
import { avatars } from "@/src/utils/dummyData";

export default function EditProfileScreen() {
  const { theme } = useUnistyles();
  const router = useRouter();

  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const [name, setName] = useState("Snow Olohijere");
  const [email, setEmail] = useState("snow@gmail.com");

  const handleSave = () => {
    console.log("Save changes:", { selectedAvatar, name, email });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.descriptionContainer}>
          <Typography
            variant="body"
            weight="regular"
            color={theme.color.textMuted}
          >
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
    // paddingHorizontal: theme.spacing.l,
    paddingTop: theme.spacing.m,
    paddingBottom: theme.spacing.l,
  },
  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    // paddingHorizontal: theme.spacing.l,
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
    // paddingHorizontal: theme.spacing.l,
    gap: theme.spacing.l,
  },
  inputGroup: {
    gap: theme.spacing.s,
  },
  label: {
    marginBottom: theme.spacing.xs,
  },
  buttonContainer: {
    // paddingHorizontal: theme.spacing.l,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
}));
