import React from "react";
import { View, Pressable, Image, FlatList } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import { SearchIcon } from "@/src/assets/svgs";
import Input from "@/src/components/common/Input";
import Typography from "@/src/components/common/Typography";

const moviesData = [
  {
    id: 1,
    title: "The Unforgivable",
    image: require("../../../assets/images/image1.png"),
  },
  {
    id: 2,
    title: "Old Guard",
    image: require("../../../assets/images/image2.png"),
  },
  {
    id: 3,
    title: "Steve",
    image: require("../../../assets/images/image3.png"),
  },
  {
    id: 4,
    title: "The Irishman",
    image: require("../../../assets/images/image4.png"),
  },
  {
    id: 5,
    title: "Django",
    image: require("../../../assets/images/image5.png"),
  },
  {
    id: 6,
    title: "Oppenheimer",
    image: require("../../../assets/images/image6.png"),
  },
  {
    id: 7,
    title: "Midnight",
    image: require("../../../assets/images/image7.png"),
  },
  { id: 8, title: "Ox", image: require("../../../assets/images/image8.png") },
  {
    id: 9,
    title: "All Day and a Night",
    image: require("../../../assets/images/image9.png"),
  },
  {
    id: 10,
    title: "White Frick",
    image: require("../../../assets/images/image10.png"),
  },
];

function Home() {
  const renderItem = ({ item }: any) => (
    <Pressable style={styles.movieCard}>
      <Image
        source={item.image}
        style={styles.movieImage}
        resizeMode="contain"
      />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchSection}>
        <Header
          title="Hi, Dennis"
          description="Pick something to watch together."
        />
        <Input placeholder="Search movies or shows" leftIcon={<SearchIcon />} />
      </View>
      <View style={styles.movieSection}>
        <View style={styles.searchesWrapper}>
          <Typography variant="body" weight="medium">
            Top Searches
          </Typography>
        </View>

        <FlatList
          data={moviesData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.gridContent}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
export default Home;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.s,
    backgroundColor: theme.color.background,
    paddingBottom: rt.insets.bottom,
  },
  searchSection: {
    flex: 1,
    justifyContent: "center",
  },
  searchesWrapper: {
    paddingBottom: theme.spacing.m,
  },
  movieSection: {
    flex: 3.5,
  },
  gridContent: {
    // paddingVertical: theme.spacing.s,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: theme.spacing.m,
  },
  movieCard: {
    height: 100,
    width: 190,
    borderRadius: theme.radius.m,
  },
  movieImage: {
    width: "100%",
    height: "100%",
  },
}));
