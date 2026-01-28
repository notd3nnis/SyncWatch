import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";
import Typography from "@/src/components/common/Typography";
import CustomTab from "@/src/components/Tabs";
import PartyCard from "@/src/components/PartyCard";
import { pastParties, UpcomingParties } from "@/src/utils/dummyData";
import Header from "@/src/components/Header";

export default function PartiesScreen() {
  const { theme } = useUnistyles();
  const [selectedTab, setSelectedTab] = useState("Upcoming");

  const tabOptions = [
    { label: "Upcoming parties", value: "Upcoming" },
    { label: "Past parties", value: "Ended" },
  ];

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
      {selectedTab === "Upcoming" && (
        <FlatList
          data={UpcomingParties}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
    paddingHorizontal: theme.spacing.s,
    paddingBottom: rt.insets.bottom,
  },
  header: {
    paddingVertical: theme.spacing.m,
  },
  tabContainer: {
    paddingBottom: theme.spacing.l,
  },
  listContent: {
    gap: theme.spacing.l,
  },
  emptyContainer: {
    alignItems: "center",
  },
}));
