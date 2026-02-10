import { styles } from "./styles";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Pressable, Image, FlatList } from "react-native";

import { Stages } from "./types";
import Header from "../../components/TabHeader";
import { SearchIcon } from "@/src/assets/svgs";
import MovieModal from "@/src/components/Modal";
import Input from "@/src/components/common/Input";
import { MovieProps } from "./CreateParty/types";
import { moviesData } from "../../utils/dummyData";
import { Details, Form, Success } from "./CreateParty";
import Typography from "@/src/components/common/Typography";

function Home() {
  const [stage, setStage] = useState<Stages>("details");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieProps | null>(null);

  const handleCloseModal = () => {
    setModalVisible(false);
    setStage("details");
    setTimeout(() => setSelectedMovie(null), 300);
  };

  const handleMoviePress = (movie: MovieProps) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const handleCreateParty = () => {
    if (stage === "details") {
      setStage("form");
    } else if (stage === "form") {
      setStage("success");
    }
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
        <Input
          variant="secondary"
          placeholder="Search movies or shows"
          leftIcon={<SearchIcon />}
        />
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
      <MovieModal visible={modalVisible} onClose={handleCloseModal}>
        {stage === "details" && (
          <Details
            handleCreateParty={handleCreateParty}
            onClose={handleCloseModal}
            movie={selectedMovie}
          />
        )}
        {stage === "form" && (
          <Form
            handleCreateParty={handleCreateParty}
            onClose={handleCloseModal}
            movie={selectedMovie}
          />
        )}
        {stage === "success" && (
          <Success
            handleCreateParty={handleCreateParty}
            onClose={handleCloseModal}
            movie={selectedMovie}
          />
        )}
      </MovieModal>
    </SafeAreaView>
  );
}
export default Home;
