import {StyleSheet} from 'react-native-unistyles'

export const styles = StyleSheet.create((theme, rt) => ({
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
    paddingVertical: theme.spacing.s,
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
