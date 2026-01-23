import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Pressable, Image, FlatList } from "react-native";

import { styles } from "./styles";
import { SearchIcon } from "@/src/assets/svgs";
import Header from "../../components/Header";
import Input from "@/src/components/common/Input";
import { moviesData } from "../../utils/dummyData";
import Typography from "@/src/components/common/Typography";
import MovieModal from "@/src/components/Modal";
import { Movie } from "@/src/components/Modal/types";

function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleCloseModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedMovie(null), 300);
  };

  const handleMoviePress = (movie: Movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const renderItem = ({ item }: any) => (
    <Pressable style={styles.movieCard} onPress={() => handleMoviePress(item)}>
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
      <MovieModal
        visible={modalVisible}
        onClose={handleCloseModal}
        movie={selectedMovie}
      />
    </SafeAreaView>
  );
}
export default Home;
