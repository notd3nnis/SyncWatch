import { styles } from "./styles";
import React, { useState, useEffect } from "react";
import {
  View,
  Pressable,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Stages } from "./types";
import Header from "../../components/TabHeader";
import { SearchIcon } from "@/src/assets/svgs";
import MovieModal from "@/src/components/Modal";
import Input from "@/src/components/common/Input";
import { MovieProps } from "../homePage/CreateParty/types";
import { fetchPopularMovies } from "@/src/services/tmdb";
import { Details, Form, Success } from "./CreateParty";
import Typography from "@/src/components/common/Typography";
import { useAuth } from "@/src/context/AuthContext";
import { useUnistyles } from "react-native-unistyles";

function Home() {
  const { theme } = useUnistyles();
  const [stage, setStage] = useState<Stages>("details");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieProps | null>(null);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    let cancelled = false;
    fetchPopularMovies()
      .then((list) => {
        if (!cancelled) setMovies(list);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message ?? "Failed to load movies");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

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

  const renderItem = ({ item }: { item: MovieProps }) => (
    <Pressable style={styles.movieCard} onPress={() => handleMoviePress(item)}>
      <Image
        source={item.image}
        style={styles.movieImage}
        resizeMode="cover"
      />
    </Pressable>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchSection}>
          <Header
            title={`Hi, ${user?.displayName}`}
            description="Pick something to watch together."
          />
          <Input
            variant="secondary"
            placeholder="Search movies or shows"
            leftIcon={<SearchIcon />}
          />
        </View>
        <View style={[styles.movieSection, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#E50914" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchSection}>
        <Header
          title={`Hi, ${user?.displayName}`}
          description="Pick something to watch together."
        />
        <Input
          variant="secondary"
          placeholder="Search movies or shows"
          leftIcon={<SearchIcon />}
        />
      </View>
      <View style={styles.movieSection}>
        {error ? (
          <View style={styles.loadingContainer}>
            <Typography
              variant="smallBody"
              weight="medium"
              color={theme.color.error}
              style={styles.errorText}
            >
              {error}
            </Typography>
          </View>
        ) : (
          <>
            <View style={styles.searchesWrapper}>
              <Typography variant="body" weight="medium">
                Top Searches
              </Typography>
            </View>
            <FlatList
              data={movies}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              contentContainerStyle={styles.gridContent}
              columnWrapperStyle={styles.row}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
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
