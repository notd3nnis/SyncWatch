import React, { useState } from "react";
import { View, FlatList, Pressable } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./styles";
import Header from "@/src/components/TabHeader";
import MovieModal from "@/src/components/Modal";
import Input from "@/src/components/common/Input";
import PartyCard from "@/src/components/PartyCard";
import CustomTab from "@/src/components/CustomTabs";
import Typography from "@/src/components/common/Typography";
import { pastParties, CurrentParties } from "@/src/utils/dummyData";
import Button from "@/src/components/common/Button";
import { useRouter } from "expo-router";

const tabOptions = [
  { label: "Current parties", value: "Current" },
  { label: "Past parties", value: "Ended" },
];

export default function PartiesScreen() {
  const router = useRouter();

  const { theme } = useUnistyles();
  const [selectedTab, setSelectedTab] = useState("Current");
  const [modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleJoinParty = () => {
    setModalVisible(true);
  };

  const handleNextPage = () => {
    setModalVisible(false);
    router.push("/party-lobby");
  };
  const renderItem = ({ item }: any) => (
    <PartyCard
      id={item.id}
      title={item.title}
      description={item.description}
      date={item.date}
      movieImage={item.movieImage}
      movieTitle={item.movieTitle}
      participants={item.participants}
      status={item.status}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Header
          title="Parties"
          description="See all the parties you’ve created."
        />
      </View>
      <View style={styles.tabContainer}>
        <CustomTab
          options={tabOptions}
          selectedValue={selectedTab}
          onValueChange={setSelectedTab}
        />
      </View>
      {selectedTab === "Current" && (
        <FlatList
          data={CurrentParties}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Typography
                variant="body"
                weight="regular"
                color={theme.color.textMuted}
              >
                No {selectedTab} parties yet
              </Typography>
            </View>
          }
        />
      )}
      {selectedTab === "Ended" && (
        <FlatList
          data={pastParties}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Typography
                variant="body"
                weight="regular"
                color={theme.color.textMuted}
              >
                No {selectedTab} parties yet
              </Typography>
            </View>
          }
        />
      )}
      <View style={styles.stickyButtonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.joinButton,
            pressed && styles.joinButtonPressed,
          ]}
          onPress={handleJoinParty}
        >
          <Typography
            align="center"
            variant="h2"
            weight="bold"
            color={theme.color.white}
          >
            +
          </Typography>
          <Typography
            align="center"
            variant="body"
            weight="medium"
            color={theme.color.white}
          >
            Join a party
          </Typography>
        </Pressable>
      </View>
      <MovieModal visible={modalVisible} onClose={handleCloseModal}>
        <View style={styles.joinPartySection}>
          <Typography weight="semibold" variant="subHeading" align="center">
            Join a watch party
          </Typography>
          <Input label="Enter invite code" placeholder="6-digit invite code" />
          <View style={styles.ButtonWrapper}>
            <Button onPress={() => handleNextPage()} title="Go to party">
              Go to party
            </Button>
          </View>
        </View>
      </MovieModal>
    </SafeAreaView>
  );
}
